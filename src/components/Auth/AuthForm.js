import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailHandler = useRef();
  const passwordHandler = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const eneteredEmail = emailHandler.current.value;
    const eneteredPasswrod = passwordHandler.current.value;
    setIsLoading(true);
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHjtPMFjOLbXkoB0dDTZdVJk-RZjZuOaY",
        {
          method: "POST",
          body: JSON.stringify({
            email: eneteredEmail,
            password: eneteredPasswrod,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            // if(data && data.error && data.error.message){
            //   errorMessage = data.error.message
            // }
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordHandler} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{!isLogin ? "Create Account" : "Login"}</button>
          )}
          {isLoading && <p>Sending Requests...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;