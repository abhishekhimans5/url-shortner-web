import React from "react";
import "./spinner.css";

const Spinner = ({ fullPage = false}) => {

  const containerClass = fullPage
    ? "loader-overlay"
    : "loader-container";

  return (
    <div
      className={containerClass}
    >
      <div className="spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Spinner;
