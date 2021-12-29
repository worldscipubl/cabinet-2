import React, { useState } from "react";
import "./Spoiler.scss";
import SpoilerArrow from "../SpoilerArrow";

const Spoiler = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`spoiler ${open ? "open" : ""}`}>
      <div className="spoiler__header" onClick={() => setOpen((prev) => !prev)}>
        <h3 className="spoiler__title text">{title}</h3>
        <SpoilerArrow isOpen={open} />
      </div>
      <div className="spoiler__content">{children}</div>
    </div>
  );
};

export default Spoiler;
