import React from "react";
import hotelUrl from "../images/hotel.jpg";
import { Link } from "react-router-dom";

function Bookingcard(props) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6" style={{ marginLeft: "50px", marginTop: "50px" }}>
          <div>
            <div style={{ display: "inline-block" }}>
              <p style={{ fontSize: "20px" }}>
                {" "}
                From: {props.booking.startdate} &emsp; To:{" "}
                {props.booking.enddate}
              </p>
            </div>

            <h2>Total amount: {props.booking.amount}</h2>
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
