import React, { Component } from "react";
import { useState } from "react";
import Search from "./Search";
import Portfolio from "./Portfolio";
import Calculate from "./Calculate";
import axios from "axios";

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
        setSearchResults([...data.data.currencies]);
      })
      .catch((err) => {
        debugger;
      });
    setName(evt.target.value);
  };

  const handleSelect = (evt) => {
    evt.preventDefault();
    const id = parseInt(evt.target.dataset.id);
    let selectedCurr = searchResults.filter((key) => key.id === id);
    setActiveCurrency(selectedCurr[0]);
    setName(selectedCurr[0].name);
    setSearchResults([]);
  };

  const handleAmountChange = (evt) => {
    setAmount(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("/calculate", { id: activeCurrency.id, amount: amount })
      .then((data) => {
        setAmount("");
        setActiveCurrency(null);
        setPortfolio([...portfolio, data.data]);
      })
      .catch((err) => {
        debugger;
      });
  };

  return (
    <div>
      <h1>Cryptocurrency Portfolio Calculator</h1>
      {!activeCurrency ? (
        <Search
          handleChange={handleChange}
          handleSelect={handleSelect}
          searchResults={searchResults}
          name={name}
        />
      ) : (
        <Calculate
          handleSubmit={handleSubmit}
          activeCurrency={activeCurrency}
          handleAmountChange={handleAmountChange}
        />
      )}
      <Portfolio portfolio={portfolio} />
    </div>
  );
};

export default PortfolioContainer;
