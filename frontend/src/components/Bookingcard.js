import React from "react";
import hotelUrl from "../images/hotel.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Bookingcard(props) {
  const [roomDetails, setRoomDetails] = React.useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_LOCALHOST + "/room/getroom", {
        params: { roomId: props.booking.roomId },
      })
      .then((response) => {
        console.log(response.data);
        setRoomDetails(response.data);
      });
  }, []);

  const cancelBooking = (bookingId, _id) => {
    axios
      .delete(process.env.REACT_APP_LOCALHOST + "/booking/cancelBooking", {
        params: {
          userName: localStorage.getItem("userName"),
          previousRoomID: bookingId,
          bookingId: _id,
        },
      })
      .then((response) => {
        console.log(response.data);
        props.setForce(!props.force);
      });
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6" style={{ marginLeft: "50px", marginTop: "50px" }}>
          <div>
            <div style={{ display: "inline-block" }}>
              <h2>Hotel: {roomDetails.hotel}</h2>
              <h2>Room: {roomDetails.room}</h2>

              <p style={{ fontSize: "20px" }}>
                {" "}
                From: {props.booking.startdate} &emsp; To:{" "}
                {props.booking.enddate}
              </p>
            </div>
            <h3>Amenities:</h3>
            <ul>
              {props.booking.amenities.map((amenity) => (
                <li>
                  {amenity.amenity}: ${amenity.cost}
                </li>
              ))}
            </ul>

            <h2>Total amount: ${props.booking.amount}</h2>
          </div>

          <div style={{ display: "inline-block", marginTop: "40px" }}>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <Link
                class="btn btn-dark"
                to={"/hoteloverview"}
                state={props.booking}
              >
                Change Booking Reservation
              </Link>
              <button
                type="button"
                class="btn btn-primary"
                style={{ marginLeft: "70px" }}
                onClick={() => {
                  cancelBooking(props.booking.roomId, props.booking._id);
                }}
              >
                Cancel Reservation
              </button>
            </p>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Bookingcard;
