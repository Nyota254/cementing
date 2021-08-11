import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  const [show, setShow] = useState(false);

  const toggleInfo = () => {
    setShow(() => {
      return !show;
    });
  };

  return (
    <div className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={toggleInfo}>
          {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      <p>{show && info}</p>
    </div>
  );
};

export default Question;
