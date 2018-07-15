import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { history } from "redux/history";

const rootReducer = (state: object) => state;
const reducer = connectRouter(history)(rootReducer);
const initialState = {};
const middleware = compose(
  applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
  ),
);

export const store = createStore(reducer, initialState, middleware);
