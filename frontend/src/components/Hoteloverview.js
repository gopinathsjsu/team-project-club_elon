import React, { useEffect, useState } from "react";

function Hoteloverview(props) {
  let url = document.location.href;
  let url_arr = url.split("/");
  let hotelName = url_arr.pop();
  hotelName = hotelName.replaceAll("%20", " ").trim();

  return (
    <div>
      {hotelName}
      Hello hotel page
    </div>
  );
}

export default Hoteloverview;
