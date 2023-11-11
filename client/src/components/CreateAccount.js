import React, { useState } from "react";
import { useFormik } from "formik";


function CreateUser({ loggedIn, setLoggedIn }) {
  const [formErrors, setFormErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  // form to create a new user account
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // posts created account to the database
    onSubmit: (values) => {
      fetch("/create_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Failed to create user.");
          }
        })
        .then((user) => {
          // creates success message for newly created user
          setSuccessMessage(`User created: ${user}`);
          console.log("User created:", user);
          formik.resetForm();
          setFormErrors([]);
        })
        .catch((error) => {
          setFormErrors([error.message]);
        });
    },
  });

  return (
    <div>
      <p id="email-text">Sign up with an email address</p>
      <form onSubmit={formik.handleSubmit} className="create-account-form">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        
        {formErrors.length > 0 && (
          <p style={{ color: "red" }}>{formErrors.join(", ")}</p>
        )}
        <button id="button" type="submit">
          Add User
        </button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={formik.handleSubmit} className="form"></form>
      <div id="login-link-container">
        <p id="login-link-text">Already have an account?</p>
        {/* link to login page */}
        <a id="login-link" href="http://localhost:3000/login">
          Login in
        </a>
      </div>
    </div>
  );
}

export default CreateUser;
