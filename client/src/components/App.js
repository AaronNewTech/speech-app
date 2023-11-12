// npm start --prefix client
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import CreateUser from "./CreateAccount";
import CreateCard from "./CreateCard";
import RockPaperScissors from "./RockPaperScissors";
import SpeechPractice from "./SpeechPractice";
import UseContext from "./UseContext";
import About from "./About";
import SavedCards from "./SavedCards";
import EmptyRoute from "./EmptyRoute";
import NavBar from "./NavBar";
import Videos from "./Videos";

function App() {
  const [email, setEmail] = useState("");
  

  // console.log(email)
  return (
    <div>
      <UseContext>
        <NavBar />
        <Routes>
          <Route exact path="https://aaronnewtech.github.io/speech-app" element={<Home />} />
          <Route
            exact
            path="https://aaronnewtech.github.io/speech-app/login"
            element={<LoginForm email={email} setEmail={setEmail} />}
          />
          <Route exact path="https://aaronnewtech.github.io/speech-app/about" element={<About />} />
          <Route exact path="https://aaronnewtech.github.io/speech-app/create-account" element={<CreateUser />} />
          <Route exact path="https://aaronnewtech.github.io/speech-app/create-card" element={<CreateCard />} />
          <Route exact path="https://aaronnewtech.github.io/speech-app/videos" element={<Videos />} />
          <Route
            exact
            path="https://aaronnewtech.github.io/speech-app/rock-paper-scissors-game"
            element={<RockPaperScissors />}
          />

          {/* <Route exact path="/snake_game" element={<SnakeGame loggedIn={loggedIn} setLoggedIn={setLoggedIn} score={score} setscore={setScore} />} />
        <Route exact path="/tic_tac_toe_game" element={<TicTacToe loggedIn={loggedIn} setLoggedIn={setLoggedIn} score={score} setScore={setscore} />} /> */}

          <Route exact path="https://aaronnewtech.github.io/speech-app/favorite-cards" element={<SavedCards />} />
          <Route
            exact
            path="https://aaronnewtech.github.io/speech-app/speech-practice"
            element={<SpeechPractice email={email} setEmail={setEmail} />}
          />
          <Route exact path="https://aaronnewtech.github.io/speech-app/empty-route" element={<EmptyRoute />} />
        </Routes>
      </UseContext>
    </div>
  );
}

export default App;
