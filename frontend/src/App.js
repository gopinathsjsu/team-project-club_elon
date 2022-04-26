import "./App.css";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Hoteloverview from "./components/Hoteloverview";
import RoomOverview from "./components/RoomOverview";
import {
  BrowserRouter as Router,
  Redirect,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    //Use Browser Router to route to different pages
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/hotels" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hoteloverview" element={<Hoteloverview />} />
          <Route path="/roomoverview" element={<RoomOverview />} />

          {/*redirects any other url other then above to / path i.e. login*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
