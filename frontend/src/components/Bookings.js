import { React, useEffect, useState } from "react";
import axios from "axios";
import Bookingcard from "./Bookingcard";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [RedirectVar, setRedirectVar] = useState(null);
  const [force, setForce] = useState(false);
  let navigate = useNavigate();
  let userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      setRedirectVar(navigate("../users/login", { replace: true }));
    }
    axios
      .get(process.env.REACT_APP_LOCALHOST + "/users/mybookings", {
        params: { ownerId: userName },
      })
      .then((response) => {
        setbookings(
          <div className="container">
            <div className="row">
              {response.data.map((booking) => (
                <div
                  key={booking.bookingName}
                  id="cardItem"
                  className="col-xs-4"
                >
                  <Bookingcard
                    booking={booking}
                    force={force}
                    setForce={setForce}
                  />
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
      <h1>Bookings</h1>
      {bookings}
    </div>
  );
}

export default Bookings;
