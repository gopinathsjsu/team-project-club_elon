import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
function Login() {
  //maintain the state required for this component
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authMsg, setAuthMsg] = useState(null);
  const [RedirectVar, setRedirectVar] = useState(null);

  //currently using cookie, todo: use JWT token
  //if session is active Redirect to home page
  let RedirectVar1 = null;
  if (cookie.load("cookie")) {
    RedirectVar1 = <Redirect to="/home" />;
  }

  //submit Login handler to send a request to the node backend
  const submitLogin = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    //Note:  REACT_APP_LOCALHOST is an env variable so that we can change the actual host address easily from one place for all API requests
    axios
      .post(process.env.REACT_APP_LOCALHOST + "/login", data)
      .then((response) => {
        if (response.data === "SUCCESS") {
          setRedirectVar(<Redirect to="/home" />);
        } else {
          setAuthMsg(
            <p style={{ color: "red" }}>
              Invalid credentials. Please check again, or register for new
              account.
            </p>
          );
        }
      });
  };

  return (
    <div>
      {RedirectVar}
      {RedirectVar1}
      <form onSubmit={submitLogin}>
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Login</h2>
                <p>Please enter your email and password</p>
              </div>

              <div class="form-group">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  autoFocus
                />
              </div>
              <div class="form-group">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-dark">
                Login
              </button>
              {authMsg}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
//export Login Component
export default Login;
