
// librares
import { combineReducers } from "redux";

// Custom Reducers
import misc from './misc';
import auth from './auth';

export default combineReducers({
    auth,
    misc
});