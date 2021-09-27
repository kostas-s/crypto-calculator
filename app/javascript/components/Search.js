import React, { Component } from "react";

const Search = ({ handleChange, handleSelect, searchResults, name }) => {
  return (
    <div>
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
          <ul className="currency-list">
            {Array.from(searchResults).map((value) => {
              return (
                <li
                  key={value.id}
                  onClick={handleSelect}
                  data-id={value.id}
                  className="currency-list-item"
                >
                  <span>{value.name} </span>
                  <span>{value.currency_symbol}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};
// searchResults content
// {
//   "id": 1,
//   "name": "Bitcoin",
//   "description": null,
//   "max_supply": 21000000,
//   "currency_symbol": "BTC",
//   "slug": "bitcoin",
//   "created_at": "2021-09-26T18:25:26.280Z",
//   "updated_at": "2021-09-26T18:25:26.280Z"
// }
export default Search;
