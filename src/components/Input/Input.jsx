import React from "react";

const Input = ({ ...props }) => {
  if (props?.type === "file") delete props?.value;

  return <input {...props} />;
};

export default Input;
