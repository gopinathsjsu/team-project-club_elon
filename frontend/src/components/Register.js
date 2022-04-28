import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { useNavigate } from "react-router-dom";

//Define a Register Component
function Register() {
  //maintain the state required for this component
  const [fullName, setFullName] = useState(null);
  const [username, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authMsg, setAuthMsg] = useState(null);
  const [RedirectVar, setRedirectVar] = useState(null);

  let navigate = useNavigate();

  if (localStorage.getItem("userName")) {
    setRedirectVar(navigate("../hotels", { replace: true }));
  }

  //submit Login handler to send a request to the node backend
  const submitRegister = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    axios
      .post(process.env.REACT_APP_LOCALHOST + "/users/register", data)
      .then((response) => {
        if (response.status === 200) {
          setRedirectVar(navigate("../users/login", { replace: true }));
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
