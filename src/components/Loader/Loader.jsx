import React, { forwardRef } from "react";
import "./Loader.scss";

const Loader = forwardRef(({ className = "", ...props }, ref) => {
  const style = "loader__wrapper " + className;
  return <div ref={ref} className={style} {...props}>
    <div className="loader"></div>
  </div>;
});

export default Loader;
