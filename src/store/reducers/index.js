
// librares
import { combineReducers } from "redux";

// Custom Reducers
import misc from './misc';
import profile from './profile';
import auth from './auth';

export default combineReducers({
    auth,
    profile,
    misc
});