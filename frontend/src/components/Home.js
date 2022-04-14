import { React, useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Hotelcard from "./Hotelcard";

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // axios.defaults.headers.common["authorization"] =
    // localStorage.getItem("token");
    axios
      .get(process.env.REACT_APP_LOCALHOST + "/hotels/gethotels")
      .then((response) => {
        console.log(response.data);
        setHotels(
          <div className="container">
            <div className="row">
              {response.data.map((hotel) => (
                <div key={hotel.hotelName} id="cardItem" className="col-xs-4">
                  <Hotelcard hotel={hotel} />
                </div>
              ))}
            </div>
          </div>
        );
      });
  }, []);

  return (
    <div class="home">
      <h1>Explore different Hotels, Prices and Book now!</h1>
      {hotels}
    </div>
  );
}

export default Home;
