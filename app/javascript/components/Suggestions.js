import React from "react";
import Suggestion from "./Suggestion";

const Suggestions = ({ coin_suggestions }) => {
  return (
    <div>
      {Array.from(coin_suggestions).map((val, id) => {
        return (
          <li key={id}>
            <Suggestion name={val.name} />
          </li>
        );
      })}
    </div>
  );
};

export default Suggestions;
