import React, { useState } from "react";
import data from "./data";
import SingleQuestion from "./Question";
function App() {
  // console.log(data);
  return (
    <main>
      <div className="container">
        <h3>FAQ's About Login</h3>
        <section className="info">
          {data.map((question) => {
            return <SingleQuestion key={question.id} {...question} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
