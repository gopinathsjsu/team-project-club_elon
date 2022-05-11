import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let home = null;
  let register = null;
  let login = null;
  let logout = null;
  let bookings = null;

  if (!localStorage.getItem("userName")) {
    register = (
      <li class="nav-item active">
        <Link class="nav-link" to={"/users/register"}>
          Register <span class="sr-only">(current)</span>
        </Link>
      </li>
    );
    login = (
      <li class="nav-item active">
        <Link class="nav-link" to={"/users/login"}>
          Login <span class="sr-only">(current)</span>
        </Link>
      </li>
    );

    <li class="nav-item">
      <Link class="nav-link" to={"/hotels"}>
        home
      </Link>
    </li>;
  } else {
    home = (
      <Link class="navbar-brand md-2" to={"/hotels"}>
        Hotel Management System
      </Link>
    );
    logout = (
      <Link class="nav-link" to={"/users/logout"}>
        Logout <span class="sr-only">(current)</span>
      </Link>
    );
    bookings = (
      <Link class="nav-link" to={"/bookings"}>
        Bookings <span class="sr-only">(current)</span>
      </Link>
    );
  }
  return (
    <div>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </head>

      <body>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossorigin="anonymous"
        ></script>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse offset-8"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mr-auto">
              {home}
              {register}
              {login}
              {bookings}
              {logout}
            </ul>
          </div>
        </nav>
      </body>
    </div>
  );
}

export default Navbar;
