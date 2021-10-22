import React from "react";
import "./Loader.scss";

const Loader = ({ className = "" }) => {
  const style = "loader__wrapper " + className;
  return <div className={style}>
    <div className="loader"></div>
  </div>;
};

export default Loader;
