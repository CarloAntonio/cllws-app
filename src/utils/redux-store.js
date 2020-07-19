import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Helpers
import reducers from "../store/reducers";

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
)(createStore);

const store = composedEnhancers(reducers, initialState);
export default store;