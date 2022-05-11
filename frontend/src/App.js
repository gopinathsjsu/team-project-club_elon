import "./App.css";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Hoteloverview from "./components/Hoteloverview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomOverview from "./components/RoomOverview";
import Bookings from "./components/Bookings";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";

function App() {
  return (
    //Use Browser Router to route to different pages
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Home />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/logout" element={<Logout />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/hoteloverview" element={<Hoteloverview />} />
          <Route path="/roomoverview" element={<RoomOverview />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
