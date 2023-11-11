import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// empty route for useeffect purposes
function EmptyRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/speech-practice");
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default EmptyRoute;
