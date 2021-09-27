import React, { Component } from "react";

const Portfolio = ({ portfolio }) => {
  return (
    <>
      <h1>Your Portfolio.</h1>
      <div className="portfolio">
        {portfolio.length > 0
          ? portfolio.map((item, idx) => {
              return (
                <li key={idx}>
                  {item.currency.name}. Amount:{item.amount}, Value:{item.value}
                  . (Current Price: {item.current_price})
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
