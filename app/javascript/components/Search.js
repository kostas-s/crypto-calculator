import React, { Component } from "react";

const Search = ({ handleChange, name }) => {
  return (
    <div>
      <h1>Cryptocurrency Portfolio Calculator</h1>
      <form>
        <div className="form-group">
          <label>Search for a Currency:</label>
          <br />
          <input
            onChange={handleChange}
            autoComplete="off"
            type="text"
            name="name"
            placeholder="Ex: Bitcoin, Litecoin..."
            value={name}
            className="field"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
