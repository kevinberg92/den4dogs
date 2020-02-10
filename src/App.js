import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Usage } from "./components/Home/Usage";
import { Dens } from "./components/Home/Dens";
import { NoMatch } from "./components/Home/NoMatch";
import { Layout } from "./components/Layout.component";
import { NavigationBar } from "./components/header/NavigationBar.component";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dens" component={Dens} />
              <Route path="/Usage" component={Usage} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
