import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/auth";
import { fetchUserInfo } from "../slices/userInfo";

const NavbarComponent = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = user?.id;

  const signout = () => {
    dispatch(logout());

    setUser(null);
  };

  useEffect(() => {
    userId && dispatch(fetchUserInfo(userId));

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch, userId, location]);

  if (user) console.log(user);

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
              {user && (
                <Nav.Link href={`/user/${user.id}`} className="mx-5">
                  Profile
                </Nav.Link>
              )}

              <Link to={!user ? "/auth" : "/"}>
                <Button
                  variant={user ? "info" : "danger"}
                  className="ml-5 nav-button"
                  onClick={user && signout}
                >
                  {user ? "Log out" : "Log in"}
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
