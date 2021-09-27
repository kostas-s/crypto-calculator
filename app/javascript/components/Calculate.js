import React, { Component } from "react";

const Calculate = ({
  handleBack,
  handleSubmit,
  activeCurrency,
  handleAmountChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>How much {activeCurrency.name} do you own?</label>
          <br />
          <input
            onChange={handleAmountChange}
            autoComplete="off"
            type="number"
            name="amount"
            placeholder="How much do you own?"
            className="field"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn-calculate"
            value="Add to Portfolio"
          ></input>
          <button onClick={handleBack} className="btn-back">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Calculate;
