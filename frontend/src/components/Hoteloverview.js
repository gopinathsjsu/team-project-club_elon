import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roomcard from "./Roomcard";
import hotelUrl from "../images/hotel.jpg";

function Hoteloverview() {
  const location = useLocation();
  const hotel = location?.state;
  
  console.log(hotel);
  return (
    <div className="container m-3">
      <div className="row offset-md-4">
        <div class="col-md-8 offset-md-4">
          <div class="col-md-4">
            <img
              src={hotelUrl}
              alt="Unavailable"
              style={{ width: "100%", display: "block" }}
            ></img>
          </div>

          <h1 className="align">{hotel.hotelName}</h1>
          
          <h3>{hotel.hotelAddress}</h3>
          <p>{hotel.hotelPhone}</p>
        </div>
        {hotel.rooms.map((room) => (
          <div
            key={room._id}
            id="cardItem"
            className="col-md-8"
            style={{ margin: "10px" }}
          >
            <Roomcard room={room} hotelName={hotel.hotelName}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hoteloverview;
