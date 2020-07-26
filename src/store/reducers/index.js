
// librares
import { combineReducers } from "redux";

// Custom Reducers
import auth from './auth';
import user from './user';
import profile from './profile';
import posts from './posts';
import misc from './misc';

export default combineReducers({
    auth,
    user,
    profile,
    posts,
    misc
});