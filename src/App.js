import React, { useContext, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Usage from "./components/Home/Usage";
import Dens from "./components/Home/Dens";
import { NoMatch } from "./components/Home/NoMatch";
import { Layout } from "./components/Layout.component";
import Users from "./components/Home/Users";
import NewDenForm from "./components/newDen/NewDenPage";
import Profile from "./components/Profile/Profile.component";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component";
import EditAccess from "./components/EditAccess/EditAccess";
import history from "./utils/history";
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";
import Loading from "./components/Loading/Loading";
import { Auth0Context } from "./react-auth0-spa";

import "./App.css";

const App = () => {
  const user = useContext(Auth0Context);
  const [loggedUser, setLoggedUser] = useState("placeholder");
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  } 
    

  if (user.isAuthenticated && !user.loading && userIsLoading) {
    console.log(user)
    if (validateEmail(user.user.email)) {
      setLoggedUser(user.user.email);
      setUserIsLoading(false);
    } else {
      console.log("NOT A VALID EMAIL");
      setError(true)
    }
  } 
  if (!userIsLoading) {
    return (
      <div className="App">
          <React.Fragment>
            <Router history={history}>
              <MenuWrapper userName={loggedUser} />
              <Layout>
                <Switch>
                  <Route exact path="/" render={(props) => <Home {...props} userName={loggedUser} />}/>
                  <PrivateRoute path="/dens" render={(props) => <Dens {...props} userName={loggedUser} />}/>
                  <PrivateRoute path="/access" render={(props) => <EditAccess {...props} userName={loggedUser} />}/>
                  <PrivateRoute path="/usage" component={Usage} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/users" render={(props) => <Users {...props} userName={loggedUser} />} />
                  <PrivateRoute path="/newDen" component={NewDenForm} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout>
            </Router>
          </React.Fragment>
      </div>
    );
    
  }
   else {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }
    
     
  
  

  }


export default App;


