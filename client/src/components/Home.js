import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function Home() {
  const { user } = useAuth();
  return (
    <div id="home-page-1">
      <br />
      <div className="row-1">
        <div className="column">
          <img
            id="speech-trainer-main-logo"
            src="/images/speech-trainer-main-logo.png"
            alt="speech-trainer-logo"
          />
        </div>
        <div className="column">
          <img
            id="home-kids-image-1"
            src="/images/HomePageImages/Home4.png"
            alt="kids-image"
          />
        </div>
        <div className="column">
          <div>
            <img
              id="home-level-up-image"
              src="/images/HomePageImages/Home2.png"
              alt="level-up-image"
            />
            {user ? (
              <NavLink to={"/login"}>
              <img
                id="logout-image"
                src="/images/HomePageImages/HomeLogout.png"
                alt="logout-image"
              />
            </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <img
                  id="login-image"
                  src="/images/HomePageImages/HomeLogin.png"
                  alt="login-image"
                />
              </NavLink>
            )}

            {/* <img id="line-image" src="/images/HomePageImages/Home3.png" alt="line-image" /> */}
          </div>
        </div>
      </div>
      <div id="home-page-2">
        <div className="row-2">
          <img
            id="home-welcome-image"
            src="/images/HomePageImages/Home5.png"
            alt="home-welcome-image"
          />
          <img
            id="home-wind-image"
            src="/images/HomePageImages/Home6.png"
            alt="home-wind-image"
          />
          <img
            id="home-stars-image"
            src="/images/HomePageImages/Home7.png"
            alt="home-stars-image"
          />
        </div>
      </div>

      <div id="home-page-3">
      <div className="row-4">
            <img
              id="home-learning-center-image"
              src="/images/HomePageImages/Home8.png"
              alt="home-learning-center-image"
            />
          </div>
        <div className="row-3">
          <div className="column-2">
            <NavLink to="/videos">
              <img
                id="video-speech-trainer-logo"
                src="/images/video-speech-trainer-logo.png"
                alt="Video Speech Trainer"
              />
            </NavLink>
            </div>
            <div className="column-2">
            <NavLink to="/speech-practice">
              <img
                id="first-words-logo"
                src="/images/first-words-logo.png"
                alt="First Words"
              />
            </NavLink>
            </div>
            <div className="column-2">
            <NavLink to="/rock-paper-scissors-game">
              <img
                id="games-logo"
                src="/images/HomePageImages/games-logo.png"
                alt="Rock Paper Scissors"
              />
            </NavLink>
            </div>
          </div>
          
        
      </div>
    </div>
  );
}

export default Home;
