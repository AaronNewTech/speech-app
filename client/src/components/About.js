import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

function About() {
  return (
    <div>
      <NavBar  />
      <div className="instructions">
        <h1>Speech Trainer</h1>
        <h2>How to Use This App:</h2>
        <br />
        <p>
          This application has games that are played with intermittent speech
          practice opportunities.
        </p>
        <br />
        <p>
          The game continues when the player correctly speaks the requested
          sound.
        </p>
        <br />
        <p>
          The goal is to use the fun of games to teach the player how to speak.
        </p>
        <br />
        <p>
          For the best experience and to track your progress please login.
        </p>
      </div>
    </div>
  );
}

export default About;
