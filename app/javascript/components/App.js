import React, { Component } from "react";
import PortfolioContainer from "./PortfolioContainer";
import axios from "axios";

const App = () => {
  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
  return <PortfolioContainer />;
};

export default App;
