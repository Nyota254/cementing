import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index }) => {
  const [alert, setAlert] = useState(false);
  const rgbcode = rgb.join(",");
  const hex = rgbToHex(...rgb);

  useEffect(() => {
    let alertTimer = setTimeout(() => {
      return setAlert(false);
    }, 3000);
    return () => clearTimeout(alertTimer);
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${rgbcode})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>
      {alert && <p className="alert">copied to clipboard!</p>}
    </article>
  );
};

export default SingleColor;
