import React from "react";
import hotelUrl from "../images/hotel.jpg";
import { Link } from "react-router-dom";

function Hotelcard(props) {
  let isAdmin = localStorage.getItem("userName") === "admin@gmail.com";
  let hotelButton = null;
  if (isAdmin) {
    hotelButton = (
      <Link class="btn btn-success" to={"/hoteloverview"} state={props.hotel}>
        Room Maintainance
      </Link>
    );
  } else {
    hotelButton = (
      <Link class="btn btn-dark" to={"/hoteloverview"} state={props.hotel}>
        View Rates
      </Link>
    );
  }

  return (
    <div class="container">
      <div
        class="row offset-0"
        style={{
          border: "rgba(0,0,0,.125) solid 1px",
          padding: "10px",
        }}
      >
        <div class="col-md-4">
          <img src={hotelUrl} alt="Unavailable" style={{ width: "100%" }}></img>
        </div>

        <div class="col-md-4">
          <div>
            <div style={{ display: "inline-block" }}>
              <h2>{props.hotel.hotelName}</h2>
              <p style={{ fontSize: "20px" }}>
                {" "}
                Location: {props.hotel.hotelAddress}
              </p>
            </div>

            <div style={{ display: "block" }}>
              {hotelButton}
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Hotelcard;
