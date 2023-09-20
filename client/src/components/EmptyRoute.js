import React, { useState, useEffect } from "react";
import { useHistory, withRouter, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./UseContext";

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
