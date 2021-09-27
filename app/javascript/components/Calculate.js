import React, { Component } from "react";

const Calculate = ({ handleSubmit, activeCurrency, handleAmountChange }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>How much {activeCurrency.name} do you own?:</label>
          <br />
          <input
            onChange={handleAmountChange}
            autoComplete="off"
            type="text"
            name="amount"
            placeholder="How much do you own?"
            className="field"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn-calculate"
            value="Calculate"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Calculate;
