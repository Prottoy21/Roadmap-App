import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
