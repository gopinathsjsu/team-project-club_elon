import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RoomOverview() {
  const location = useLocation();
  const room = location?.state;
  const [checkInDate, setCheckInDate] = useState([]);
  const [checkOutDate, setCheckOutDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseInt(room.roomPrice));

  const [breakFast, setBreakFast] = useState(null);
  const [gym, setGym] = useState(null);
  const [spa, setSpa] = useState(null);
  const [parking, setParking] = useState(null);
  const [meal, setMeal] = useState(null);

  const [RedirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

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
    let amenities = {};
    if (parking) {
      amenities.parking = 10;
    }
    if (spa) {
      amenities.spa = 20;
    }
    if (gym) {
      amenities.gym = 20;
    }
    if (breakFast) {
      amenities.breakFast = 15;
    }
    if (meal) {
      amenities.meal = 40;
    }

    let data = {
      startDate,
      endDate,
      hotel,
      room,
      amenities,
      amount: totalPrice,
    };

    axios
      .post(process.env.REACT_APP_LOCALHOST + "/booking/createBooking", data)
      .then((res) => {
        if (res.data === "updated") {
          alert("Booking Successful, redirecting to booking page in 5 seconds");
          setInterval(() => {
            setRedirectVar(navigate("../bookings", { replace: true }));
          }, 5000);
        } else if (res.status === 400) {
          alert("Booking Failed");
        } else {
          alert("Booking Failed");
        }
      });
  };
  return (
    <div className="container m-3">
      {RedirectVar}
      <div className="row offset-md-4">
        <div className="col-md-8 offset-md-4">
          <h2> Type: {room.roomName}</h2>
          <h3>Price of room: ${room.roomPrice}</h3>
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

        <div className="col-md-5 offset-md-2" style={{ marginTop: "40px" }}>
          <input
            type="checkbox"
            id="breakfast"
            name="breakfast"
            value="breakfast"
            onChange={(e) => {
              if (breakFast === null) {
                setBreakFast(e.target.value);
                setTotalPrice(totalPrice + 15);
              } else {
                setBreakFast(null);
                setTotalPrice(totalPrice - 15);
              }
            }}
          />
          &emsp;
          <label for="breakfast">
            {" "}
            Daily Continental Breakfast &emsp;&emsp;$15
          </label>
          <br></br>

          <input
            type="checkbox"
            id="gym"
            name="gym"
            value="Gym"
            onChange={(e) => {
              if (gym === null) {
                setGym(e.target.value);
                setTotalPrice(totalPrice + 20);
              } else {
                setGym(null);
                setTotalPrice(totalPrice - 20);
              }
            }}
          />
          &emsp;<label for="gym"> Gym &emsp;&emsp;$20</label>
          <br></br>

          <input
            type="checkbox"
            id="spa"
            name="spa"
            value="Spa"
            onChange={(e) => {
              if (spa === null) {
                setSpa(e.target.value);
                setTotalPrice(totalPrice + 20);
              } else {
                setSpa(null);
                setTotalPrice(totalPrice - 20);
              }
            }}
          />
          &emsp;<label for="spa"> Swimming Pool/Jacuzzi &emsp;&emsp;$20</label>
          <br></br>

          <input
            type="checkbox"
            id="parking"
            name="parking"
            value="Parking"
            onChange={(e) => {
              if (parking === null) {
                setParking(e.target.value);
                setTotalPrice(totalPrice + 10);
              } else {
                setParking(null);
                setTotalPrice(totalPrice - 10);
              }
            }}
          />
          &emsp;<label for="parking"> Daily Parking &emsp;&emsp;$10</label>
          <br></br>

          <input
            type="checkbox"
            id="allmeals"
            name="allmeals"
            value="allmeals"
            onChange={(e) => {
              if (spa === null) {
                setMeal(e.target.value);
                setTotalPrice(totalPrice + 40);
              } else {
                setMeal(null);
                setTotalPrice(totalPrice - 40);
              }
            }}
          />
          &emsp;<label for="allmeals"> All Meals &emsp;&emsp;$40</label>
          <br></br>
          <br></br>

          <h3>Total price:&emsp; ${totalPrice}</h3>
        </div>
        <button
          className="btn btn-dark"
          onClick={() => checkBooking(checkInDate, checkOutDate, room)}
          style={{ marginTop: "30px" }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default RoomOverview;
