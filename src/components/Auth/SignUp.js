import { useRef } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      alert("please fill all fields");
      return;
    }

    for (let i = 0; i < password.length; i++) {
      if (password[i] !== confirmPassword[i]) {
        alert("password and confirm password does not match");
        return;
      }
    }

    if (password.length < 6) {
      alert("password is too short");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMCRv6A2RlE36nAMBYrfJ-3aBiPdMCfZE",
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

      if (res.ok) {
        console.log('User has successfully signed up.')
      }else{
        throw new Error(data.error.message)
      }
    } catch (e) {
        alert(e);
    }
  };

  return (
    <Container className={classes.main}>
      <Card className={classes.signUp}>
        <Card.Body>
          <Card.Title>
            <h2>Sign Up</h2>
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
            <FormGroup>
              <FormControl
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm password"
              />
            </FormGroup>
            <Button type="submit" variant="outline-primary">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className={classes.logIn}>
        <Card.Body>
          <Card.Text>Have an account? Log in</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
