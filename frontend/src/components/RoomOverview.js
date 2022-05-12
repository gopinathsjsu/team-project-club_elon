import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RoomOverview() {
  const location = useLocation();
  const props = location?.state;
  const [checkInDate, setCheckInDate] = useState([]);
  const [checkOutDate, setCheckOutDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isWeekend, setIsWeekend] = useState(false);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [useReward, setUseReward] = useState(false);
  const [rewards, setRewards] = useState(0);
  const christmas = new Date("12/25/2022");
  const thanksgiving = new Date("11/22/2022");
  const halloween = new Date("10/31/2022");
  const martinluther = new Date("01/17/2022");
  const independence = new Date("07/04/2022");

  let isAdmin = localStorage.getItem("userName") === "admin@gmail.com";
  let DateIn = "Check In Date:";
  let DateOut = "Check In Date:";
  let buttonActionText = "Book now";
  let buttonColor = "black";

  let displayAmenities = "block";
  if (isAdmin) {
    displayAmenities = "none";
    DateIn = "Make Unavailable from:";
    DateOut = " to:";
    buttonActionText = "Make room Unavailable";
    buttonColor = "darkred";
  } else {
  }

  const listOfHolidays = [
    thanksgiving,
    halloween,
    martinluther,
    independence,
    christmas,
    new Date("12/26/2022"),
    new Date("12/27/2022"),
    new Date("12/28/2022"),
    new Date("12/29/2022"),
    new Date("12/30/2022"),
    new Date("12/31/2022"),
  ];

  const [breakFast, setBreakFast] = useState(null);
  const [gym, setGym] = useState(null);
  const [spa, setSpa] = useState(null);
  const [parking, setParking] = useState(null);
  const [meal, setMeal] = useState(null);

  const [RedirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

  const finalBook = (
    <button
      className="btn btn-dark"
      onClick={() => checkBooking(checkInDate, checkOutDate, props)}
      style={{ marginTop: "30px", backgroundColor: buttonColor }}
    >
      {buttonActionText}
    </button>
  );

  const book = (
    <button
      className="btn btn-dark"
      onClick={() => setIsBooked(true)}
      style={{ marginTop: "30px", backgroundColor: buttonColor }}
    >
      {buttonActionText}
    </button>
  );

  const rewardDiv = (
    <div className="row">
      <div
        className="col-md-6 offset-3 d-flex justify-content-center"
        style={{ border: "solid" }}
      >
        <h3>
          <span>Use Reward?</span>
          <span style={{ display: "block" }}>
            <button className="btn btn-dark" onClick={() => setUseReward(true)}>
              Yes
            </button>
            <button
              className="btn btn-dark"
              onClick={() => checkBooking(checkInDate, checkOutDate, props, 0)}
              style={{ marginLeft: "60px" }}
            >
              No
            </button>
          </span>
        </h3>
      </div>
    </div>
  );

  const selectReward = (
    <div className="row">
      <div
        className="col-md-6 offset-3 d-flex justify-content-center"
        style={{ border: "solid" }}
      >
        <h3>
          <span>Select Reward:</span>
          <span style={{ display: "block" }}>
            <input
              type="radio"
              name="reward"
              value="10"
              onClick={() =>
                checkBooking(
                  checkInDate,
                  checkOutDate,
                  props,
                  Math.floor(rewards / 10)
                )
              }
            />
            <span>10%</span>
            <input
              type="radio"
              name="reward"
              value="50"
              onClick={() =>
                checkBooking(
                  checkInDate,
                  checkOutDate,
                  props,
                  Math.floor(rewards / 2)
                )
              }
            />
            <span>50%</span>
            <input
              type="radio"
              name="reward"
              value="100"
              onClick={() =>
                checkBooking(checkInDate, checkOutDate, props, rewards)
              }
            />
            <span>100%</span>
          </span>
        </h3>
      </div>
    </div>
  );

  console.log(props.room);
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
  const checkBooking = (checkInDate, checkOutDate, roomData, r) => {
    let sdate = new Date(checkInDate);
    let edate = new Date(checkOutDate);
    console.log("rewards amount: " + r);

    const startDate = {
      month: sdate.getMonth() + 1,
      day: sdate.getDate(),
    };

    const endDate = {
      month: edate.getMonth() + 1,
      day: edate.getDate(),
    };

    console.log(props);

    const hotel = props.hotelName;
    const room = props.room.roomName;

    console.log(hotel, "    ---------------and--------------- ", room);
    console.log({ startDate, endDate, hotel, room });

    if (localStorage.getItem("userName") === "admin@gmail.com") {
      let data = {
        startDate,
        endDate,
        hotel,
        room,
      };

      axios
        .post(process.env.REACT_APP_LOCALHOST + "/admin/createBooking", data)
        .then((res) => {
          console.log("Errrrr heee--------------", res);
          if (res.status === 400) {
            alert("Room is already unavailable");
            setRedirectVar(navigate("/hotels", { replace: true }));
          } else if (res.data === "updated") {
            alert("Room successfully made unavailable!");
            setRedirectVar(navigate("/hotels", { replace: true }));
          } else {
            setRedirectVar(navigate("/hotels", { replace: true }));
            alert("Room is already unavailable");
          }
        });
    } else {
      let amenities = [];
      if (parking) {
        amenities.push({ amenity: "Parking", cost: 10 });
      }
      if (spa) {
        amenities.push({ amenity: "Spa", cost: 20 });
      }
      if (gym) {
        amenities.push({ amenity: "Gym", cost: 30 });
        amenities.gym = 20;
      }
      if (breakFast) {
        amenities.push({ amenity: "Breakfast", cost: 15 });
      }
      if (meal) {
        amenities.push({ amenity: "Meal", cost: 40 });
      }

      let userName = localStorage.getItem("userName");

      let data = {
        userName,
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
            updateRewards(r);
            setRedirectVar(navigate("../bookings", { replace: true }));
          } else if (res.status === 400) {
            alert("Booking Failed");
          } else {
            alert("Booking Failed");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Booking Failed for this dates! \nPlease select other dates.");
        });
    }
  };

  const updateRewards = (r) => {
    let userName = localStorage.getItem("userName");
    let data;
    if (r === 0) {
      data = {
        username: userName,
        rewards: Math.floor(totalPrice / 10),
      };
    } else {
      data = {
        username: userName,
        rewards: r - rewards,
      };
    }
    axios
      .post(process.env.REACT_APP_LOCALHOST + "/users/updateRewards", data)
      .then((res) => {
        if (res.data === "updated") {
          console.log("updated");
        } else {
          console.log("failed");
        }
      });
  };

  const setCheckOutDateAndCalculateDays = (e) => {
    setCheckOutDate(e.target.value);

    const out = new Date(e.target.value);
    const ind = new Date(checkInDate);
    out.setDate(out.getDate() + 1);
    ind.setDate(ind.getDate() + 1);
    console.log("out: " + out.getDate() + " in: " + ind.getDate());

    const t = out.getTime() - ind.getTime();
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let holidays = 0;
    let weekends = 0;

    for (let i = ind; i < out; i.setDate(i.getDate() + 1)) {
      console.log("holiday: " + checkHoliday(i));
      if (checkHoliday(i)) {
        holidays = holidays + 3;
        setIsHoliday(true);
        days = days - 1;
      } else if (checkWeekend(i)) {
        setIsWeekend(true);
        days = days - 1;
        weekends = weekends + 2;
      }
    }

    console.log("days: " + days);
    console.log("holidays: " + holidays);
    console.log("weekends: " + weekends);
    days = days + holidays + weekends;
    if (holidays === 0) {
      setIsHoliday(false);
    }
    if (weekends === 0) {
      setIsWeekend(false);
    }
    setTotalPrice(days * props.room.roomPrice);
  };

  const checkWeekend = (date) => {
    let day = date.getDay();
    if (day === 0 || day === 6) {
      return true;
    }
    return false;
  };

  const checkHoliday = (date) => {
    let day = date.getDate();
    let month = date.getMonth();

    for (let i = 0; i < listOfHolidays.length; i++) {
      if (
        day === listOfHolidays[i].getDate() &&
        month === listOfHolidays[i].getMonth()
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      axios
        .get(process.env.REACT_APP_LOCALHOST + "/users/getRewards", {
          params: { username: localStorage.getItem("userName") },
        })
        .then((response) => {
          setRewards(response.data.rewards);
        });
    }
  }, []);

  return (
    <div className="container m-3">
      {RedirectVar}
      <div
        className="row offset-md-4"
        style={{ border: "rgba(0,0,0,.125) solid 1px" }}
      >
        <div className="col-md-8 offset-md-4">
          <h2> Type: {props.room.roomName}</h2>
          <h3>Price of room: ${props.room.roomPrice}</h3>
        </div>
        <div className="col-md-8 offset-md-2">
          <label>
            <b>{DateIn} </b>
          </label>
          <input
            type="date"
            placeholder="Check-in Date"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckInDate(e.target.value)}
          ></input>
          &emsp;
          <label>
            <b>{DateOut} </b>
          </label>
          <input
            type="date"
            min={getCheckOutDate(checkInDate, 2)}
            max={getCheckOutDate(checkInDate, 7)}
            placeholder="Check-out Date"
            onChange={(e) => setCheckOutDateAndCalculateDays(e)}
            // onChange={(e) => setCheckOutDateAndCalculateDays(e)}
            // onClick={(e) => setCheckOutDateAndCalculateDays(e)}
          ></input>
        </div>

        <div
          className="col-md-5 offset-md-3"
          style={{ marginTop: "40px", display: displayAmenities }}
        >
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
              if (meal === null) {
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
          <h5 style={{ fontStyle: "italic", color: "red" }}>
            {isWeekend
              ? "Cost for Weekends are 2X: $" + props.room.roomPrice * 2
              : ""}
          </h5>
          <h5 style={{ fontStyle: "italic", color: "red" }}>
            {isHoliday
              ? "Cost for Holidays are 3X: $" + props.room.roomPrice * 3
              : ""}
          </h5>
        </div>
        {useReward ? selectReward : isBooked ? rewardDiv : book}
      </div>
    </div>
  );
}

export default RoomOverview;
