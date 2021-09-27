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
      .post("/search", {
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

  const addSpinnerChildToElement = (element) => {
    const spinnerParent = document.createElement("div");
    spinnerParent.classList.add("d-flex", "justify-content-center", "my-5");
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border");
    spinner.style = "width: 8rem; height: 8rem;";
    spinner.role = "status";
    spinnerParent.appendChild(spinner);
    element.appendChild(spinnerParent);
  };

  const handleBack = (evt) => {
    setAmount("");
    setActiveCurrency(null);
    setName("");
  };

  const disableButton = (button) => {
    button.classList.add("clicked");
    button.disabled = true;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addSpinnerChildToElement(evt.target);
    disableButton(document.querySelector(".btn-calculate"));
    disableButton(document.querySelector(".btn-back"));

    axios
      .post("/calculate", { id: activeCurrency.id, amount: amount })
      .then((data) => {
        // console.log(data);
        if (data.data.error) {
          throw new Error(data.data.error);
        } else {
          setPortfolio([...portfolio, data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAmount("");
        setActiveCurrency(null);
        setName("");
      });
  };

  return (
    <div className="app-container">
      <div className="left-column-container">
        <h1>Crypto Calculator</h1>
        {!activeCurrency ? (
          <Search
            handleChange={handleChange}
            handleSelect={handleSelect}
            searchResults={searchResults}
            name={name}
          />
        ) : (
          <Calculate
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            activeCurrency={activeCurrency}
            handleAmountChange={handleAmountChange}
          />
        )}
      </div>
      <div className="right-column-container">
        <Portfolio portfolio={portfolio} />
      </div>
    </div>
  );
};

export default PortfolioContainer;
