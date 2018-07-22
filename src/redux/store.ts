import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { history } from 'redux/history';

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
  // maxAge sets the number actions Redux DevTools should store. default 50.
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

const rootReducer = (state: object) => state;
const reducer = connectRouter(history)(rootReducer);
const initialState = {};
const middleware = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
  ),
);

export const store = createStore(reducer, initialState, middleware);
