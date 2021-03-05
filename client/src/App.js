import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./Pages/HomePage";
import "./scss/App.scss";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <HomePage />
    </>
  );
};

export default App;
