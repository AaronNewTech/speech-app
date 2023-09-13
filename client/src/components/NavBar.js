import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
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
          <NavLink to="/create_account"> Create Account </NavLink>
        </li>
        <li>
          <NavLink to="/rock_paper_scissors_game"> Rock Paper Scissors </NavLink>
        </li>
        <li>
          <NavLink to="/snake_game"> Snake Game </NavLink>
        </li>
        <li>
          <NavLink to="/tic_tac_toe_game"> TicTacToe Game </NavLink>
        </li>
        <li>
          <NavLink to="/voice_test"> Voice Test </NavLink>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;
