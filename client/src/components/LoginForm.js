import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

function LoginForm({ loggedIn, setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user is logged in on component mount
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

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
          // Login successful, update your app's state to indicate the user is logged in
          setLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true"); // Store login status
          setEmail(""); // Clear email field
          setPassword(""); // Clear password field
          setError(""); // Clear error

          console.log("user logged in");
        } else {
          // Login failed, display an error message
          setError("Invalid email or password.");
        }
      } else {
        // Request failed for some reason, display a general error message
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // Logout the user by removing their login status from localStorage
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  console.log(loggedIn);

  return (
    <div>
      <NavBar />
      {loggedIn ? (
        <>
          <p>Welcome back, {email}! You are now logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form>
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
          <button type="button" onClick={handleLogin}>
            Submit
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginForm;
