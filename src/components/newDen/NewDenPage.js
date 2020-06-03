import React from "react";
import NewDen2 from "./NewDen2.component";
import NewDen from "./NewDen.component";
import { Container } from "react-bootstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Error from "../Error/Error";
import "./NewDenPage.css";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      error: false,
      identifier: null,
      authLevel: null
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  async componentDidMount(){
    await this.checkUser()
  }
  async checkUser(){
    var idProp = ""
    try {
      const response = await fetch('http://localhost:3000/api/users/access', {
        method: 'post',
        body: 'email=' + this.props.userName,
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      })
      const data = await response.json();
      console.log("NEW DEN      FETCHED DATA" + JSON.stringify(data.data[0]));
      switch (data.data[0].auth_level) {
        case 2:
          this.setState({ identifier: data.data[0].country });
          break;
        case 3:
          this.setState({ identifier: data.data[0].location });
      
        default:
          idProp = ""
          break;
      }
      this.setState({
        user: data.data[0].email,
        authLevel: data.data[0].auth_level,
      });
      
    } catch (error) {
      console.log(error)
      this.setState({error: true});
    }

    console.log("Identifier" + this.state.identifier);
  }



  handleChange(event) {
    if (this.state.value === 0) {
      this.setState({ value: 1 });
    } else if (this.state.value === 1) {
      this.setState({ value: 0 });
    }
  }
  render() {
    if (this.state.error === true) {
      return (
        <Error />
      );
    }
    else if (this.state.value === 0) {
      return (
        <div id="container">
          <Container>
            <Tabs
              className="box3"
              value={this.state.value}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={this.handleChange}
              aria-label="tabs"
            >
              <Tab label="Register den location" />
              <Tab label="Add new den" />
            </Tabs>
            <NewDen authLevel={this.state.authLevel} identifier={this.state.identifier}/>
          </Container>
        </div>
      );
    } else {
      return (
        <div id="container">
          <Container>
            <Tabs
              className="box3"
              value={this.state.value}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={this.handleChange}
              aria-label="tabs"
            >
              <Tab label="Register den location" />
              <Tab label="Add new den" />
            </Tabs>
            <NewDen2  authLevel={this.state.authLevel} identifier={this.state.identifier}/>
          </Container>
        </div>
      );
    }
  }
}
