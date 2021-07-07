import React from "react";

import Navigation from "./pages/Navigation";
import Main from "./pages/Main";

import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navigation />
      <Main />
    </div>
  );
}
