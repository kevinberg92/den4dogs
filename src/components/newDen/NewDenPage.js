import React from "react";
import NewDen2 from "./NewDen2.component";
import NewDen from "./NewDen.component";
import { Container } from "react-bootstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./NewDenPage.css";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.state.value === 0) {
      this.setState({ value: 1 });
    } else if (this.state.value === 1) {
      this.setState({ value: 0 });
    }
  }
  render() {
    if (this.state.value === 0) {
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
            <NewDen />
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
            <NewDen2 />
          </Container>
        </div>
      );
    }
  }
}
