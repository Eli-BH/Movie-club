import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { GrGoogle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, authLogin } from "../slices/auth";
import { useHistory } from "react-router-dom";

import FileBase from "react-file-base64";
import PasswordStrengthBar from "react-password-strength-bar";

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userIcon: "",
  });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const history = useHistory();

  const switchMode = () => {
    setSignUp(!signUp);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    if (signUp) {
      dispatch(authSignUp(formData, history));
    } else {
      dispatch(authLogin(formData, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const googleFormData = {
      firstName: result.givenName,
      lastName: result.familyName,
      userName: result.name,
      email: result.email,
      password: result.googleId,
      confirmPassword: result.googleId,
      userIcon: result.imageUrl,
    };

    if (signUp) {
      console.log(googleFormData);
      dispatch(authSignUp(googleFormData, history));
    } else {
      console.log(googleFormData);
      dispatch(authLogin(googleFormData, history));
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign in was unsuccessful. Try Again Later");
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <Card bg="dark" text="light">
        <Card.Body>
          <div className="cardHeader">
            <Card.Header className="d-flex justify-content-center">
              <Card.Title>
                <h2>{signUp ? "Sign Up" : "Sign In"}</h2>
              </Card.Title>
            </Card.Header>
          </div>

          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                {signUp && (
                  <>
                    <Form.Row>
                      <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          placeholder="First Name"
                          name="firstName"
                          size="sm"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          placeholder="Last Name"
                          name="lastName"
                          size="sm"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          placeholder="Username"
                          name="userName"
                          size="sm"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Col className="d-flex flex-column align-content-center">
                        <Form.Label>Profile Icon</Form.Label>
                        <div>
                          <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                              setFormData({ ...formData, userIcon: base64 })
                            }
                          />
                        </div>
                      </Col>
                    </Form.Row>
                  </>
                )}
                <Form.Row>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="Email"
                      name="email"
                      size="sm"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      size="sm"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form.Row>
                {signUp && <PasswordStrengthBar password={formData.password} />}

                {signUp && (
                  <Form.Row>
                    <Form.Group as={Col} controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="confirm password"
                        name="confirmPassword"
                        size="sm"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form.Row>
                )}
                <Button type="submit" variant="outline-info" block>
                  {signUp ? "Sign Up" : "Sign In"}
                </Button>
                <GoogleLogin
                  // MUST REPLACE THE CLIENT ID
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
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
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
        {signUp
          ? "Already have an account? Sign In"
          : "Don't have and account? Sign Up"}
      </Button>
      {authState.hasError && (
        <Alert variant="danger">{authState.hasError.message}</Alert>
      )}
      {authState?.authData?.message && (
        <Alert variant="success">{authState.authData.message}</Alert>
      )}
    </Container>
  );
};

export default AuthForm;
