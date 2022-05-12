import React from "react";
import { Link } from "react-router-dom";

export default function Roomcard(props) {
  console.log("Hotelm name: ", props.room, "thissss:", props.hotelName);
  let isAdmin = localStorage.getItem("userName") === "admin@gmail.com";
  let roomButton = null;
  if (isAdmin) {
    roomButton = (
      <Link to="/roomoverview" className="btn btn-success" state={props}>
        Make these rooms unavailable
      </Link>
    );
  } else {
    roomButton = (
      <Link to="/roomoverview" className="btn btn-dark" state={props}>
        Book Now
      </Link>
    );
  }

  return (
    <div className="card" style={{ width: "56rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.room.roomName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Price: $ {props.room.roomPrice}
        </h6>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        {roomButton}
        <p>Available Rooms: {props.room.roomCount}</p>
      </div>
    </div>
  );
}
