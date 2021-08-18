import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Oops! its a dead end</h1>
        <Link to="/">
          <button className="btn">Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export default Error;
