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
  const [refreshDisabled, setRefreshDisabled] = useState(false);

  const handleRefresh = (evt) => {
    evt.preventDefault();
    if (refreshDisabled) return;
    setRefreshDisabled(true);

    axios
      .post("/refresh", {
        coin_names: portfolio.map((val) => {
          return val["currency"]["slug"];
        }),
      })
      .then((result) => {
        // Get each portfolio item and update its price
        const updatedPortfolio = [...portfolio];
        for (let item of updatedPortfolio) {
          item.current_price =
            result.data.updated_data[item["currency"]["slug"]]["eur"];
          item.value = item.current_price * parseInt(item.amount);
        }
        setPortfolio(updatedPortfolio);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => setRefreshDisabled(false), 6000);
      });
  };
  const handleChange = (evt) => {
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

  const handlePortfolioDelete = (evt) => {
    const targetIdx = Number(evt.target.dataset.portfolio_idx);
    setPortfolio(
      portfolio.filter((item) => {
        return item !== portfolio[targetIdx];
      })
    );
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
        <Portfolio
          portfolio={portfolio}
          handlePortfolioDelete={handlePortfolioDelete}
          handleRefresh={handleRefresh}
          refreshDisabled={refreshDisabled}
        />
      </div>
    </div>
  );
};
export default PortfolioContainer;
