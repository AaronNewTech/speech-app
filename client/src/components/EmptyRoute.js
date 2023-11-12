import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";


function EmptyRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("https://aaronnewtech.github.io/speech-app/speech-practice");
  }, [navigate]);

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default EmptyRoute;
