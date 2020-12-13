import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "../reducers/Index";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";

function configureStore() {
  const history = createHashHistory();
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, {}, composedEnhancers);

  return store;
}

const store = configureStore();

export default store;
