import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function NavBar() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <nav className="navbarStyles">
        <div>
          <NavLink to="/"> Home </NavLink>
        </div>
        <div>
          <NavLink to="/login"> Login </NavLink>
        </div>
        <div>
          <NavLink to="/about"> About </NavLink>
        </div>

        {/* <li>
          <NavLink to="/videos"> Videos </NavLink>
        </li>
        <li>
          <NavLink to="/rock-paper-scissors-game">Rock Paper Scissors</NavLink>
        </li> */}

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
                <NavLink to="/rock-paper-scissors-game">
                  Games
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* <li>
          <NavLink to="/speech-practice"> Speech Practice </NavLink>
        </li> */}
      </nav>
    </div>
  );
}

export default NavBar;
