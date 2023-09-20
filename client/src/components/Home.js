import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate, NavLink } from "react-router-dom";

function Home() {
  // const navigate = useNavigate();

  // function handleRoute(route) {
  //   navigate(route);
  // }

  return (
    <div>
      {/* href="http://localhost:3000/speech-trainer" */}
      <img
        id="speech-trainer-main-logo"
        src="/images/speech-trainer-main-logo.png"
      ></img>
      <div className="image-link-container">
        <NavLink to="/videos">
          <img
            id="video-speech-trainer-logo"
            src="/images/video-speech-trainer-logo.png"
            alt="Video Speech Trainer"
          />
        </NavLink>
        <NavLink to="/speech-practice">
          <img
            id="first-words-logo"
            src="/images/first-words-logo.png"
            alt="First Words"
          />
        </NavLink>
        <NavLink to="/rock-paper-scissors-game">
          <img
            id="rock-paper-scissors-logo"
            src="/images/rock-paper-scissors-logo.png"
            alt="Rock Paper Scissors"
          />
        </NavLink>
      </div>
      {/* <img id="video-speech-trainer-logo" src="/images/video-speech-trainer-logo.png" ></img>
      <img id="first-words-logo" src="/images/first-words-logo.png" ></img>
      <img id="rock-paper-scissors-logo" src="/images/rock-paper-scissors-logo.png" ></img> */}
    </div>
  );
}

export default Home;
