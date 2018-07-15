import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Landing, Home } from 'routes';
import { store } from 'redux/store';
import { history } from 'redux/history';
import { NavbarLayout } from 'layouts';
import 'semantic-ui-css/semantic.min.css';
import 'styles/global';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <NavbarLayout>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect path='*' to='/'/>
      </Switch>
    </NavbarLayout>
    <Redirect path='*' to='/'/>
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
