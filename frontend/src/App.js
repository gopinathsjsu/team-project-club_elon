import "./App.css";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Hoteloverview from "./components/Hoteloverview";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    //Use Browser Router to route to different pages
    <Router>
    <div>
     <Navbar/>
      <Switch>
        <Route exact path="/hotels" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/hotels" component={Hoteloverview} />
        {/*redirects any other url other then above to / path i.e. login*/}
        <Redirect from="*" to="/hotels" />{" "}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
