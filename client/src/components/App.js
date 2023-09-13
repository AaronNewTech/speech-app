import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import CreateUser from "./CreateAccount";
// import RockPaperScissors from "./RockPaperScissorsGame";
// import SnakeGame from "./SnakeGame";
// import TicTacToe from "./TicTacToeGame";
import VoiceTest from "./VoiceTest";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [recordState, setRecordState] = useState(false);
  const [level, setLevel] = useState(1);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route
          exact
          path="/login"
          element={<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route exact path="/create_account" element={<CreateUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        {/* <Route
          exact
          path="/rock_paper_scissors_game"
          element={<RockPaperScissors loggedIn={loggedIn} setLoggedIn={setLoggedIn} level={level} setLevel={setLevel} />}
        />
        <Route exact path="/snake_game" element={<SnakeGame loggedIn={loggedIn} setLoggedIn={setLoggedIn} level={level} setLevel={setLevel} />} />
        <Route exact path="/tic_tac_toe_game" element={<TicTacToe loggedIn={loggedIn} setLoggedIn={setLoggedIn} level={level} setLevel={setLevel} />} /> */}
        <Route exact path="/voice_test" element={<VoiceTest />} />
      </Routes>
    </div>
  );
}

export default App;
