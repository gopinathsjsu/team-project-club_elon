import React from "react";
import hotelUrl from "../images/hotel.jpg";
import sanjose from "../images/sanjose.jpg";
import newyork from "../images/newyork.jpg";
import chicago from "../images/hotel.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function AllBookingcard(props) {
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

  const cancelBooking = (bookingId) => {
    axios
      .delete(process.env.REACT_APP_LOCALHOST + "/booking/cancelBooking", {
        params: { bookingId: bookingId },
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
              <h1>Booking by: {props.booking.ownerId}</h1>
              <h2>Hotel: {roomDetails.hotel}</h2>
              <h2>Room: {roomDetails.room}</h2>

              <p style={{ fontSize: "20px" }}>
                {" "}
                From: {props.booking.startdate} &emsp; To:{" "}
                {props.booking.enddate}
              </p>
            </div>

            <h2>Total amount: ${props.booking.amount}</h2>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default AllBookingcard;
