import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  localStorage.removeItem("userName");

  let navigate = useNavigate();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
      setRedirect(navigate("../users/login", { replace: true }));
      window.location.reload();
  }, []);

  return <div>{redirect}</div>;
}

export default Logout;
