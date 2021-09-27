import React, { Component } from "react";
import { useState } from "react";
import Search from "./Search";
import Calculate from "./Calculate";
import axios from "axios";
import Suggestions from "./Suggestions";

const PortfolioContainer = () => {
  const [name, setName] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [amount, setAmount] = useState("");

  const handleChange = (evt) => {
    const token = document.querySelector("[name=csrf-token]").content;

    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    axios
      .post("http://localhost:3000/search", {
        search: evt.target.value,
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => {
        debugger;
      });
    setName(evt.target.value);
    console.log(searchResults);
  };

  return (
    <div>
      <Search handleChange={handleChange} name={name} />
      {searchResults.data ? (
        <Suggestions coin_suggestions={searchResults.data.currencies} />
      ) : null}
      <Calculate />
    </div>
  );
};

export default PortfolioContainer;
