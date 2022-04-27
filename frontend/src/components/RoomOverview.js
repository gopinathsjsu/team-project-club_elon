import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RoomOverview() {
  const location = useLocation();
  const room = location?.state;
  const [checkInDate, setCheckInDate] = useState([]);
  const [checkOutDate, setCheckOutDate] = useState([]);
  console.log(room);
  const getCheckOutDate = (checkInDate, numberOfdays) => {
    console.log(checkInDate);
    let date = new Date(checkInDate);

    date.setDate(date.getDate() + numberOfdays);

    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log([year, month, day].join("-"));
    return [year, month, day].join("-");
  };
  const checkBooking = (checkInDate, checkOutDate, roomData) => {
    let sdate = new Date(checkInDate);
    let edate = new Date(checkOutDate);

    const startDate = {
      month: sdate.getMonth() + 1,
      day: sdate.getDate(),
    };

    const endDate = {
      month: edate.getMonth() + 1,
      day: edate.getDate(),
    };

    const hotel = roomData.hotel;
    const room = roomData.roomName;

    console.log({ startDate, endDate, hotel, room });
    axios.post(
      process.env.REACT_APP_LOCALHOST + "/booking/createBooking",
      {
        startDate,
        endDate,
        hotel,
        room,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          if (res.data.message === "SUCCESS") {
            alert(
              "Booking Successful, redirecting to booking page in 5 seconds"
            );
            setInterval(() => {
              <Navigate to="/bookings" />;
            }, 5000);
          } else if (res.status === 400) {
            alert("Booking Failed");
          } else {
            alert("Booking Failed");
          }
        }
      }
    );
  };
  return (
    <div className="container m-3">
      <div className="row offset-md-4">
        <div className="col-md-8 offset-md-4">
          <h1>{room.roomName}</h1>
          <h3>{room.roomPrice}</h3>
        </div>
        <div className="col-md-8 offset-md-4">
          <label>Check In Date</label>
          <input
            type="date"
            placeholder="Check-in Date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          <label>Check Out Date</label>
          <input
            type="date"
            min={getCheckOutDate(checkInDate, 2)}
            max={getCheckOutDate(checkInDate, 7)}
            placeholder="Check-out Date"
            onChange={(e) => setCheckOutDate(e.target.value)}
          ></input>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => checkBooking(checkInDate, checkOutDate, room)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default RoomOverview;
