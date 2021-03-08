import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const NavbarComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="nav" variant="dark">
        <Container>
          <Navbar.Brand>
            <a href="/">MovieClub</a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="mx-5" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mx-5">Profile</Nav.Link>
              <Button
                variant={loggedIn ? "info" : "danger"}
                onClick={handleLogin}
                className="ml-5"
              >
                {loggedIn ? "Log out" : "Log in"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
