import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Register Component
function Register() {
  //maintain the state required for this component
  const [fullName, setFullName] = useState(null);
  const [username, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authMsg, setAuthMsg] = useState(null);
  const [RedirectVar, setRedirectVar] = useState(null);

  //currently using cookie, todo: use JWT token
  let RedirectVar1 = null;
  if (cookie.load("cookie")) {
    RedirectVar1 = <Redirect to="/home" />;
  }

  //submit Login handler to send a request to the node backend
  const submitRegister = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(process.env.REACT_APP_LOCALHOST + "/register", data)
      .then((response) => {
        if (response.data === "SUCCESS") {
          setRedirectVar(<Redirect to="/login" />);
        } else {
          setAuthMsg(
            <p style={{ color: "red" }}>
              An account with this username already exists!
            </p>
          );
        }
      });
  };

  return (
    <div>
      {RedirectVar}
      {RedirectVar1}
      <form onSubmit={submitRegister}>
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Register</h2>
                <p>Please enter your username and password</p>
              </div>

              <div class="form-group">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="username"
                  class="form-control"
                  name="username"
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
                Register
              </button>
              {authMsg}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
//export Register Component
export default Register;
