import React from "react";
import hotelUrl from "../images/hotel.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MaintainanceRoomCard(props) {
  const [roomDetails, setRoomDetails] = React.useState([]);
  let navigate = useNavigate();
  const [RedirectVar, setRedirectVar] = useState(null);

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

  return (
    <div class="container">
      {RedirectVar}
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
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default MaintainanceRoomCard;
