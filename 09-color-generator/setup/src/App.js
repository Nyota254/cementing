import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#800080").all(10));
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all();
      setList(colors);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage("Oops!! Please insert a correct value");
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Color Shades</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#800080"
            className={`${error ? "error" : null}`}
          />
          <button type="submit" className="btn">
            Generate
          </button>
        </form>
        <h4 style={{ color: "red", marginLeft: "0.4rem" }}>{errorMessage}</h4>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          console.log({ ...color });
          return <SingleColor key={index} {...color} index={index} />;
        })}
      </section>
    </>
  );
}

export default App;
