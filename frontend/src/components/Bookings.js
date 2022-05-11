import { React, useEffect, useState } from "react";
import axios from "axios";
import Hotelcard from "./Hotelcard";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const [hotels, setHotels] = useState([]);
  const [RedirectVar, setRedirectVar] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("userName")) {
    //   setRedirectVar(navigate("../users/login", { replace: true }));
    // }
    // axios
    //   .get(process.env.REACT_APP_LOCALHOST + "/hotels/gethotels")
    //   .then((response) => {
    //     console.log(response.data);
    //     setHotels(
    //       <div className="container">
    //         <div className="row">
    //           {response.data.map((hotel) => (
    //             <div key={hotel.hotelName} id="cardItem" className="col-xs-4">
    //               <Hotelcard hotel={hotel} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     );
    //   });
  }, []);

  return (
    <div class="home">
      {RedirectVar}
      <h1>Past Bookings Page</h1>
    </div>
  );
}

export default Bookings;
