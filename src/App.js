import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Usage from "./components/Home/Usage";
import Dens from "./components/Home/Dens";
import { NoMatch } from "./components/Home/NoMatch";
import { Layout } from "./components/Layout.component";
import Users from "./components/Home/Users";

import NavigationBar from "./components/header/NavigationBar.component";
import Profile from "./components/Profile/Profile.component";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component";

import history from "./utils/history";

import { useAuth0 } from "./react-auth0-spa";

import "./App.css";

class App extends React.Component {
  /* const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  } */

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Router history={history}>
            <NavigationBar />
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/dens" component={Dens} />
                <PrivateRoute path="/usage" component={Usage} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/users" component={Users} />
                <Route component={NoMatch} />
              </Switch>
            </Layout>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
