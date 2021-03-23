import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { GrGoogle } from "react-icons/gr";

import PasswordStrengthBar from "react-password-strength-bar";

const AuthForm = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");

  const switchMode = () => {
    setIsAuth(!isAuth);
  };

  return (
    <Container>
      <Card bg="dark" text="light">
        <Card.Body>
          <div className="cardHeader">
            <Card.Header className="d-flex justify-content-center">
              <Card.Title>
                <h2>{isAuth ? "Sign Up" : "Sign In"}</h2>
              </Card.Title>
            </Card.Header>
          </div>

          <Row>
            <Col>
              <Form>
                {isAuth && (
                  <>
                    <Form.Row>
                      <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="First Name" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Last Name" />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Username" />
                      </Form.Group>
                    </Form.Row>
                  </>
                )}
                <Form.Row>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Email" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form.Row>
                <PasswordStrengthBar password={password} />
                {isAuth && (
                  <Form.Row>
                    <Form.Group as={Col} controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="confirm password"
                      />
                    </Form.Group>
                  </Form.Row>
                )}
                <Button type="submit" variant="outline-info" block>
                  {isAuth ? "Sign Up" : "Sign In"}
                </Button>
                <GoogleLogin
                  clientId="829520365691-i3j7cqph7k0m5od4p7tm09hqknv2a36l.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      variant="danger"
                      block
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="align-items-center"
                    >
                      <GrGoogle /> Sign-in with Google
                    </Button>
                  )}
                />
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Button
        onClick={switchMode}
        variant="outline-dark"
        className="my-3"
        size="sm"
        block
      >
        {isAuth
          ? "Already have an account? Sign In"
          : "Don't have and account? Sign Up"}
      </Button>
    </Container>
  );
};

export default AuthForm;
