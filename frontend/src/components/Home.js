import { React, useEffect, useState } from "react";
import axios from "axios";
import Hotelcard from "./Hotelcard";
import { useNavigate } from "react-router-dom";
import sanjose from "../images/sanjose.jpg";
import newyork from "../images/newyork.jpg";
import chicago from "../images/chicago.jpg";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [RedirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();
  let images = [sanjose, newyork, chicago];

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      setRedirectVar(navigate("../users/login", { replace: true }));
    }
    axios
      .get(process.env.REACT_APP_LOCALHOST + "/hotels/gethotels")
      .then((response) => {
        console.log(response.data);
        setHotels(
          <div className="container">
            <div className="row">
              {response.data.map((hotel, index) => (
                <div key={hotel.hotelName} id="cardItem" className="col-xs-4">
                  <Hotelcard hotel={hotel} ind={index} images={images}/>
                </div>
              ))}
            </div>
          </div>
        );
      });
  }, []);

  return (
    <div class="home">
      {RedirectVar}
      <h1>Explore different Hotels, Prices and Book now!</h1>
      {hotels}
    </div>
  );
}

export default Home;
