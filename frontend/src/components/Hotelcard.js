import React from "react";
import hotelUrl from "../images/hotel.jpg";

function Hotelcard(props) {

  return (
    <div class="container">
      <div class="row">
              <div class="col-md-4">
                <img
                  src={hotelUrl}
                  alt="Unavailable"
                  style={{ width: "100%" }}   
                ></img>
                </div>

                <div class="col-md-4" style={{marginLeft:"50px", marginTop: "50px"}}>
                <div >
                  <div style={{ display: "inline-block" }}>
                   <h2>{props.hotel.hotelName}</h2> 
                   <p style= {{fontSize:"20px"}}> Location: {props.hotel.hotelAddress}</p>
                  </div>

                  <div style={{ display: "inline-block", marginLeft: "100px" }}>
                    <button class="btn btn-dark" onClick={() => window.location.href=`/hotels/${props.hotel.hotelName}`}>View Rates</button>
                  </div>
                  </div>
               
                </div>
      </div>
      <br></br>
    </div>
  );
}

export default Hotelcard;
