import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// custom components
import Landing from './containers/Landing';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import AppBar from './containers/AppBar';
import OnBoarding from './containers/OnBoarding';
import Profile from './containers/Profile';
import ProfilePublic from './containers/ProfilePublic';

// actions
import { 
  setToken, 
  getUser,
  setAutoLogout, 
  logout 
} from './store/actions';

// utils
import { isEmptyObj } from './utils/helpers';

function App(props) {

  // redux state and dispatch
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  // lifecycles
  React.useEffect(() => {
    console.log(props)
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
      dispatch(logout());
      return;
    }

    // set extracted items
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setToken(token));
    dispatch(setAutoLogout(remainingMilliseconds));
  }, [auth.token]);

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
        <React.Fragment>
          <AppBar/>
          <Switch>
              <Route path='/profile' exact component={ Profile }/>
              <Route path='/profile/:username' exact component={ ProfilePublic }/>
              {/* <Route path='/homeroom' exact component={ HomeRoom }/>
              <Route path='/homeroom/:grade' exact component={ GradeRoom }/>
              <Route path='/homeroom/:grade/:subject' exact component={ SubjectRoom }/>
              <Route path='/homeroom/:grade/:subject/:lessonId' exact component={ Lesson }/> */}
              <Redirect to="/profile"/>
          </Switch>
        </React.Fragment>
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