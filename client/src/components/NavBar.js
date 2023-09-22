import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function NavBar() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <nav className="navbarStyles">
        <div className="navbar-links">
          <div>
            <NavLink to="/"> Home </NavLink>
          </div>
          <div>
            <NavLink to="/login"> Login </NavLink>
          </div>
          <div>
            <NavLink to="/about"> About </NavLink>
          </div>

          {user ? (
            <div className="dropdown">
              <a>My Cards</a>
              <div>
                <div className="dropdown-content">
                  <div>
                    <NavLink to="/create-card"> Create Cards </NavLink>
                  </div>
                  <div>
                    <NavLink to="/favorite-cards"> Saved Cards </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Dropdown menu */}
          <div className="dropdown">
            <a>Speech Practice</a>
            <div>
              <div className="dropdown-content">
                <div>
                  <NavLink to="/videos"> Video Speech Trainer </NavLink>
                </div>
                <div>
                  <NavLink to="/speech-practice"> First Words </NavLink>
                </div>
                <div>
                  <NavLink to="/rock-paper-scissors-game">Games</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-icons">
          <NavLink to="https://www.facebook.com/">
            <img
              id="facebook"
              src="/images/Social/facebook.png"
              alt="facebook-icon"
            />
          </NavLink>
          <NavLink to="https://instagram.com/">
            <img
              id="instagram"
              src="/images/Social/instagram.png"
              alt="instagram-icon"
              
            />
          </NavLink>
          <NavLink to="https://twitter.com">
            <img
              id="twitter"
              src="/images/Social/twitter.png"
              alt="twitter-icon"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
