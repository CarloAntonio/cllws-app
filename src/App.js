import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

// custom components
import Landing from './containers/Landing';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import AppBar from './containers/AppBar';
import OnBoarding from './containers/OnBoarding';
import Profile from './containers/Profile';

// actions
import { 
  setToken, 
  getUser,
  setAutoLogout, 
  logout 
} from './store/actions';

export default function App() {

  // redux state and dispatch
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
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
      dispatch(logout());
      return;
    }

    // set extracted items
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setToken(token));
    dispatch(setAutoLogout(remainingMilliseconds));
  }, [auth.token]);

  // return a loading page while auth data is fetched
  // TODO: turn into a loading page
  if(auth.isLoading && !auth.token) return null;

  let routes = (
    <Switch>
      <Route path='/' exact component={ Landing }/>   
      <Route path='/login' exact component={ Login }/>
      <Route path='/signup' exact component={ SignUp }/>
      <Redirect to="/"/>
    </Switch>
  )

  if (!auth.isLoading && auth.token) {
    if(user.onBoarded){
      routes = (
        <React.Fragment>
          <AppBar/>
          <Switch>
              <Route path='/profile' exact component={ Profile }/>
              {/* <Route path='/profile/:id' exact component={ ProfilePublic }/>
              <Route path='/homeroom' exact component={ HomeRoom }/>
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
