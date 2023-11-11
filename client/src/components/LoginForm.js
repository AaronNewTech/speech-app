import React, { useState, useEffect } from "react";
import { useAuth } from "./UseContext";

function LoginForm({ email, setEmail }) {
  const { user, login, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // checks if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      login(true); // updates the user state using the login function from useAuth
    }
  }, [login]);

  // handles the post for the login form
  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          login(); 
          // sets login status
          localStorage.setItem("isLoggedIn", "true"); 
          setEmail("");
          setPassword("");
          setError("");

        } else {
        
          setError("Invalid email or password.");
        }
      } else {
        
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
     
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // removes login status from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    // updates the user state using the logout function from useAuth
    logout(); 
  };

  return (
    <div id="login-container">
      {user ? (
        <>
          <p id="logged-in-message">
            Welcome back, {email}! You are now logged in.
          </p>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <form className="login-form">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id="button" type="button" onClick={handleLogin}>
            Submit
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? null : (
        <div id="create-account-container">
          <p id="create-account-text">Not Registered?</p>
          <a
            id="create-account-link"
            href="http://localhost:3000/create-account"
          >
            Create an account
          </a>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
