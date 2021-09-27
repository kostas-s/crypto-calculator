import React, { Component } from "react";

const Portfolio = ({ portfolio, handlePortfolioDelete }) => {
  const totalValue = portfolio.reduce((value, curr) => {
    return curr.value + value;
  }, 0);
  return (
    <>
      <h1>Your Portfolio</h1>
      <p>Total Value: {totalValue}</p>
      <div className="portfolio">
        {portfolio.length > 0
          ? portfolio.map((item, idx) => {
              return (
                <li className="portfolio-item" key={idx}>
                  <img
                    className="portfolio-item-image"
                    src={item.image_src}
                    alt="image"
                    name="coin-image"
                  />
                  <span className="portfolio-item-name">
                    {item.amount} {item.currency.currency_symbol}
                  </span>
                  Value:
                  <span className="portfolio-item-value">{item.value}</span>
                  Unit Price:{item.current_price}
                  <input
                    type="button"
                    onClick={handlePortfolioDelete}
                    data-portfolio_idx={idx}
                    className="delete-btn"
                    value="X"
                  />
                </li>
              );
            })
          : null}
      </div>
    </>
  );
};
// {
//   "currency": {
//   "id": 1,
//     "name": "Bitcoin",
//     "description": null,
//     "max_supply": 21000000,
//     "currency_symbol": "BTC",
//     "slug": "bitcoin",
//     "created_at": "2021-09-26T18:25:26.280Z",
//     "updated_at": "2021-09-26T18:25:26.280Z"
// },
//   "current_price": 6,
//   "amount": "1",
//   "value": 6
// }

export default Portfolio;
