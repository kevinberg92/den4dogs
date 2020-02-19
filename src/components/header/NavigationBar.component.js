import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #efefef;
  }

  .navbar-brand,
  .navbar-nav .nav-link {
    color: #d8232a;

    &:hover {
      color: #d8232a;
    }
  }
`;

const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg" className="flex-column align-items-center">
      <Navbar.Brand href="/">
        <img
          src={require("../../assets/images/Den4DogsLogoPng.png")}
          width="70"
          className="d-inline-block align-top"
          alt="React bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dens">Dens</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/usage">Usage</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default NavigationBar;
