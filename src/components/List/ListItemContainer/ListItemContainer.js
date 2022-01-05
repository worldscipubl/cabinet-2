import React from "react";
import { Link } from "react-router-dom";

const ListItemContainer = ({ link, children, ...props }) => {

  if (link) return (
    <Link to={link} target="_blank" {...props}>
      {children}
    </Link>
  );

  return (
    <div {...props}>
      {children}
    </div>
  );
};

export default ListItemContainer;
