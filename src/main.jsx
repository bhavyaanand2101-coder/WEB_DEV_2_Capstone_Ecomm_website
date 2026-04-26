import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

// Entry point of the React application
// Wrapping order matters for context access:

ReactDOM.createRoot(document.getElementById("root")).render(
  // BrowserRouter - enables routing (URL changes without page reload)
  <BrowserRouter>
    {/* AuthProvider - provides authentication context (user login state) */}
    <AuthProvider>
      {/* AppProvider - provides app context (cart, search, dark mode, etc) */}
      <AppProvider>
        {/* Main App component with all routes */}
        <App />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
);