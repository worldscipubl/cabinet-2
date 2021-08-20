import React, { useState } from "react";
import "./Spoiler.scss";

const Spoiler = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`spoiler ${open ? "open" : ""}`}>
      <div className="spoiler__header" onClick={() => setOpen((prev) => !prev)}>
        <h3 className="spoiler__title text">{title}</h3>
        <span className="spoiler__arrow">
          <svg
            className="spoiler__arrow-img"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </span>
      </div>
      <div className="spoiler__content">{children}</div>
    </div>
  );
};

export default Spoiler;
