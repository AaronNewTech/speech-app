import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

function Home({ loggedIn, setLoggedIn}) {
  return (
    <div>
      <NavBar />
      <div className="instructions">
        <h1>Speech Trainer</h1>
        <h2>How to Use This App:</h2>
        <br />
        <h3>
          This application has games that are played with intermittent speech
          practice opportunities.
        </h3>
        <br />
        <h3>
          The game continues when the player correctly speaks the requested
          sound.
        </h3>
        <br />
        <h3>
          The goal is to use the fun of games to teach the player how to speak.
        </h3>
        <br />
        <h3>
          For the best experience and to track your progress please login.
        </h3>
      </div>
    </div>
  );
}

export default Home;
