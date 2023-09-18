import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./UseContext";

function NavBar() {

  const { user, login, logout } = useAuth();
  console.log(user);
  console.log(login);
  console.log(logout);
  
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
        {/* <li>
          <NavLink to="/create_account"> Create Account </NavLink>
        </li> */}
        <li>
          <NavLink to="/create_card"> Create Card </NavLink>
        </li>
        <li>
          <NavLink to="/rock_paper_scissors_game">Rock Paper Scissors</NavLink>
        </li>
        <li>
          <NavLink to="/saved-cards"> Saved Cards </NavLink>
        </li>
        {/* <li>
          <NavLink to="/snake_game"> Snake Game </NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/tic_tac_toe_game"> TicTacToe Game </NavLink>
        </li> */}
        <li>
          <NavLink to="/speech_practice"> Speech Practice </NavLink>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;
