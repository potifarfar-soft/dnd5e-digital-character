import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Home, FourOhFour } from 'routes';
import { store } from 'redux/store';
import { history } from 'redux/history';
import { Layout } from 'layouts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/global';

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={FourOhFour} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

render(root, document.getElementById('react-root'));
