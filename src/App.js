import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// custom components
import Landing from './containers/Landing';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import AppBarSignedIn from './containers/AppBarSignedIn';
import OnBoarding from './containers/OnBoarding';
import Profile from './containers/Profile';
import ProfilePublic from './containers/ProfilePublic';
import LeftDrawerContents from './containers/LeftDrawerContents';
import Socialize from './containers/Socialize';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';

// actions
import { 
  setToken, 
  getUser,
  setAutoLogout, 
  clearReduxAndLogout
} from './store/actions';

// utils
import { isEmptyObj } from './utils/helpers';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  main: {
    flexGrow: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "84px auto",
    fontSize: "calc(10px + 2vmin)",
    maxWidth: "1020px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 20
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App(props) {
  const classes = useStyles();

  // redux state and dispatch
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const showLeftDrawer = useSelector(state => state.leftDrawer.showLeftDrawer)
  const dispatch = useDispatch();

  // lifecycles
  React.useEffect(() => {
    // if auth.token is available, then user just logged in
    if(auth.token) dispatch(getUser(auth.token))

    // extract locally stored items
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    // skip remaining actions if nothing is stored
    if (!token || !expiryDate) {
      return;
    }

    // logout if session is expired
    if (new Date(expiryDate) <= new Date()) {
      dispatch(clearReduxAndLogout());
      return;
    }

    // set extracted items
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setToken(token));
    dispatch(setAutoLogout(remainingMilliseconds));
  }, [auth.token, dispatch]);

  let routes = null
  if(!auth.isLoading && !auth.token){
    routes = (
      <Switch>
        <Route path='/login' exact component={ Login }/>
        <Route path='/signup' exact component={ SignUp }/>
        <Route path='/' component={ Landing }/>   
        {/* <Redirect to="/"/> */}
      </Switch>
    )
  } else if(!auth.token) return null;

  if (!auth.isLoading && auth.token && !isEmptyObj(user)) {
    if(user.onBoarded){
      routes = (
        <div className={classes.root}>
          <AppBarSignedIn/>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={showLeftDrawer}
            classes={{  paper: classes.drawerPaper, }}>
            <LeftDrawerContents/>
          </Drawer>
          <main className={clsx(classes.content, { [classes.contentShift]: showLeftDrawer })}>
            <div className={classes.drawerHeader} />
            <Switch>
                <Route path='/profile/:username' exact component={ ProfilePublic }/>
                <Route path='/profile' exact component={ Profile }/>
                <Route path='/socialize' exact component={ Socialize }/>
                {/* <Route path='/homeroom' exact component={ HomeRoom }/>
                <Route path='/homeroom/:grade' exact component={ GradeRoom }/>
                <Route path='/homeroom/:grade/:subject' exact component={ SubjectRoom }/>
                <Route path='/homeroom/:grade/:subject/:lessonId' exact component={ Lesson }/> */}
                <Redirect to="/profile"/>
            </Switch>
          </main>
        </div>
      )
    } else {
      routes = (
        <React.Fragment>
          <Switch>
              <Route path='/' exact component={ OnBoarding }/>
              <Redirect to="/"/>
          </Switch>
        </React.Fragment>
      )
    }
  }
    
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default withRouter(App);