import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function NavBar() {
  const { user, login, logout } = useAuth();
  
  

  return (
    <div>
      <nav className="navbarStyles">
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
        <li>
          <NavLink to="/create-card"> Create Card </NavLink>
        </li>
        {/* <li>
          <NavLink to="/videos"> Videos </NavLink>
        </li>
        <li>
          <NavLink to="/rock-paper-scissors-game">Rock Paper Scissors</NavLink>
        </li> */}
        {user ? (
          <li>
            <NavLink to="/saved-cards"> Saved Cards </NavLink>
          </li>
        ) : (
          <></>
        )}

        {/* Dropdown menu */}
        <li className="dropdown">
          <a>Speech Practice</a>
          <div>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/videos"> Video Speech Trainer </NavLink>
              </li>
              <li>
                <NavLink to="/speech-practice"> First Words </NavLink>
              </li>
              <li>
                <NavLink to="/rock-paper-scissors-game">
                  Rock Paper Scissors
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* <li>
          <NavLink to="/speech-practice"> Speech Practice </NavLink>
        </li> */}
      </nav>
    </div>
  );
}

export default NavBar;
