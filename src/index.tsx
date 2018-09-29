import { ConnectedRouter } from 'connected-react-router';
import { NavbarLayout } from 'layouts';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { history } from 'redux/history';
import { StoreManager } from 'redux/store';
import { EqTest, Home, Landing, AbilityScores, CharacterInfo, Inventory } from 'routes';
import 'semantic-ui-css/semantic.min.css';
import 'styles/global';

const store = StoreManager.createStore();

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Landing}/>
		<NavbarLayout>
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route exact path="/eq-test" component={EqTest} />
				<Route exact path="/ability-scores" component={AbilityScores} />
				<Route exact path="/character-info" component={CharacterInfo} />
				<Route exact path="/inventory" component={Inventory} />
				<Redirect path="*" to="/"/>
			</Switch>
		</NavbarLayout>
		<Redirect path="*" to="/"/>
	</Switch>
);

const Root = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<React.StrictMode>
				<Routes/>
			</React.StrictMode>
		</ConnectedRouter>
	</Provider>
);

render(<Root/>, document.getElementById('react-root'));
