import React from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

function Home() {

  //currently using cookie, todo: use JWT token
  let RedirectVar1 = null;
  if (!cookie.load("cookie")) {
    RedirectVar1 = (<Redirect to="/login" />);
  }

  return (
    <div class="home">
      {RedirectVar1}
      <h1>Explore different Hotels, Prices and Book now!</h1>
    </div>
  );
}

export default Home;
