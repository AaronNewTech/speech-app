import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import CreateUser from "./CreateUser";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={<LoginForm setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
        <Route exact path="/create_account" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
