import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import { history } from 'redux/history';

let composeEnhancers = compose;

if (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
	// maxAge sets the number actions Redux DevTools should store. default 50.
	composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ maxAge: 100 });
}

type Action = {type: "fetch-character"} | {type: "update-character", payload: {name: string}};

/* interface ReducerModule {

} */

const initialState = {
	character: null
};

const landingReducer = (state: object = initialState, action: Action) => {
	switch(action.type) {
		case 'fetch-character': {
			return {
				...state,
				character: 'Nils',
			};
		}
		case 'update-character':
			return {
				...state,
				character: action.payload.name,
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	landing: landingReducer,
});

const reducer = connectRouter(history)(rootReducer);
const middleware = composeEnhancers(
	applyMiddleware(
		routerMiddleware(history), // for dispatching history actions
	),
);

export const store = createStore(reducer, {}, middleware);
