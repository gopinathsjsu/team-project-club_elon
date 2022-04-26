import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const checkBooking = (checkInDate, checkOutDate) => {
    const startDate = {
      month: checkInDate.getMonth() + 1,
      day: checkInDate.getDate(),
    };

    const endDate = {
      month: checkOutDate.getMonth() + 1,
      day: checkOutDate.getDate(),
    };

    const hotel = room.hotel;
    const room = room.roomName;

    axios.post(
      "booking/checkBooking",
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
        <button className="btn btn-dark" onClick={() => checkBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default RoomOverview;
