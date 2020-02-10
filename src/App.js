import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import Profile from "./components/profile/profile.component";
import history from "./utils/history";
import NavBar from './components/navbar/navbar.component';
import PrivateRoute from './components/private-route/private-route.component';
//import { useAuth0 } from './';

import './App.css';


class App extends React.Component {
  
  render () {
    return(
      <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
    
  );
 }
}

export default App;
