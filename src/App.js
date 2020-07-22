import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Landing from './containers/Landing';
import SignUp from './containers/SignUp';
import Login from './containers/Login';

// actions
import { setToken, setUid, setAutoLogout, logout } from './store/actions';

export default function App() {

  // redux state and dispatch
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(logout());
      return;
    }

    const uid = localStorage.getItem('uid');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setToken(token));
    dispatch(setUid(uid));
    dispatch(setAutoLogout(remainingMilliseconds));

    // async function fetchData(){
    //   if(auth.isLoaded && !auth.isEmpty && auth.uid){
    //     try{
    //       const response = await fetch(`${envEndpoint}user/getUser`, {
    //           method: "POST",
    //           headers: new Headers({
    //             'Authorization': `Bearer ${auth.stsTokenManager.accessToken}`, 
    //             'Content-Type': 'application/json'
    //           }), 
    //       });

    //       // handle when request completed successfully
    //       if(response.ok && response.status === 200) { 
    //           // pull user data
    //           const result = await response.json();
    //           dispatch(setUser(result));
    //       }
    //     } catch(err){
    //       console.log(err);
    //     }
    //   }
    // }
    // fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={ Landing }/>   
        <Route path='/login' exact component={ Login }/>
        <Route path='/signup' exact component={ SignUp }/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}
