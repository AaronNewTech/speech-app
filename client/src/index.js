import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <LoginProvider> */}
    <App />
    {/* </LoginProvider > */}
  </BrowserRouter>
  // </React.StrictMode>
);
