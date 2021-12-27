/* eslint-disable no-unused-vars */
import * as React from "react";
import { useState } from "react";


const AutoFill = (props) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    const { label, year } = e.target.dataset;
    setInput(label);
    setSuggestions([]);
  };

  const filterSuggestions = (input) => {
    return props.props.filter((film) =>
      film.label.toLowerCase().includes(input.toLowerCase())
    );
  };
  return (
    <div className="md:container md:mx-auto pt-4">
      <div>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="border border-gray-400 p-2 w-full"
        />
      </div>
      <div className="pt-4 grid justify-items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded w-40"
          onClick={() => setInput("")}
        >
          Clear
        </button>
      </div>
      <div className="text-center pt-4 ">
        {filterSuggestions(input).map((film) => (
          <ul key={film.label}>
            <li
              data-label={film.label}
              data-year={film.year}
              onClick={handleClick}
              className="text-blue-500 cursor-pointer text-lg hover:text-violet-700"
            >
              {film.label} ({film.year})
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default AutoFill;
