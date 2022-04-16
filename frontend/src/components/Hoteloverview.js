import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roomcard from "./Roomcard";

function Hoteloverview() {
  const location = useLocation();
  const hotel = location?.state;
  console.log(hotel);
  return (
    <div className="container m-3">
      <div className="row offset-md-4">
        <div class="col-md-8 offset-md-4">
          <h1>{hotel.hotelName}</h1>
          <h3>{hotel.hotelAddress}</h3>
          <p>{hotel.hotelPhone}</p>
        </div>
        {hotel.rooms.map((room) => (
          <div key={room._id} id="cardItem" className="col-md-8">
            <Roomcard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hoteloverview;
