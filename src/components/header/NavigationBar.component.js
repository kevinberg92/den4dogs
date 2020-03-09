import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

import { useAuth0 } from "../../react-auth0-spa";

import { Link } from "react-router-dom";

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
const NavigationBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
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
              <Nav.Item>
                <Nav.Link href="/newDen">New</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav.Item>
              {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
              )}
              {isAuthenticated && (
                <button onClick={() => logout()}>Log out</button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    </div>
  );
};

export default NavigationBar;
