import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="nav" variant="dark">
        <Container>
          <Navbar.Brand className="nav-brand">
            <a href="/">MovieClub</a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="mx-5" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mx-5">Profile</Nav.Link>
              <Link to={!loggedIn && "/auth"}>
                <Button
                  variant={loggedIn ? "info" : "danger"}
                  className="ml-5 nav-button"
                >
                  {loggedIn ? "Log out" : "Log in"}
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
