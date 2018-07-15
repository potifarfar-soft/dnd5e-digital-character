import { ConnectedRouter } from "connected-react-router";
import { NavbarLayout } from "layouts";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { history } from "redux/history";
import { store } from "redux/store";
import { Home, Landing } from "routes";
import "semantic-ui-css/semantic.min.css";
import "styles/global";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing}/>
    <NavbarLayout>
      <Switch>
        <Route exact path="/home" component={Home} />
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

render(<Root/>, document.getElementById("react-root"));
