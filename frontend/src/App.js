import "./App.css";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";

function App() {
  return (
    //Use Browser Router to route to different pages
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/*redirects any other url other then above to / path i.e. login*/}
        <Redirect from="*" to="/" />{" "}
      </Switch>
    </Router>
  );
}

export default App;
