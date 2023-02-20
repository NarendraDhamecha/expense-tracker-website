import { useContext, useRef } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthContex from "../contex/AuthContex";
import classes from "./LogIn.module.css";

const LogIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const authCtx = useContext(AuthContex);
  const history = useHistory();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length == 0 || password.length == 0) {
      alert("please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("password is too short");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if(res.ok){
        authCtx.login(data.idToken, data.email)
        history.push('/home')
      }else{
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container className={classes.main}>
      <Card className={classes.logIn}>
        <Card.Body>
          <Card.Title>
            <h2>Log In</h2>
          </Card.Title>
          <Form onSubmit={onSubmitHandler}>
            <FormGroup>
              <FormControl ref={emailRef} type="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <FormControl
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button type="submit" variant="outline-primary">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className={classes.signUp}>
        <Card.Body>
          <Card.Text>
            Don't have an account? <NavLink to="/">Sign Up</NavLink>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LogIn;
