import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import CreateUser from "./CreateAccount";
import CreateCard from "./CreateCard";
import RockPaperScissors from "./RockPaperScissors";
// import SnakeGame from "./SnakeGame";
// import TicTacToe from "./TicTacToeGame";
import SpeechPractice from "./SpeechPractice";
import UseContext from "./UseContext";
import { useAuth } from "./UseContext";
import About from "./About";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [recordState, setRecordState] = useState(false);
  const [score, setScore] = useState(1);

  return (
    <div>
      <UseContext>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route exact path="/login" element={<LoginForm />} />
          <Route
            exact
            path="/create_account"
            element={
              <CreateUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            }
          />
          <Route exact path="/create_card" element={<CreateCard />} />
          <Route
            exact
            path="/rock_paper_scissors_game"
            element={
              <RockPaperScissors
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                score={score}
                setscore={setScore}
              />
            }
          />

          {/* <Route exact path="/snake_game" element={<SnakeGame loggedIn={loggedIn} setLoggedIn={setLoggedIn} score={score} setscore={setScore} />} />
        <Route exact path="/tic_tac_toe_game" element={<TicTacToe loggedIn={loggedIn} setLoggedIn={setLoggedIn} score={score} setScore={setscore} />} /> */}

          <Route exact path="/about" element={<About />} />

          <Route exact path="/speech_practice" element={<SpeechPractice />} />
        </Routes>
      </UseContext>
    </div>
  );
}

export default App;
