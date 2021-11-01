import React from "react";
import FileField from "./FileField";
import TextField from "./TextField";
import SelectField from "./SelectField";
import DateField from "./DateField";

const FieldBuilder = ({ type, ...props }) => {
  if (type === "file") return <FileField type={type} {...props} />;
  if (type === "select") return <SelectField type={type} {...props} />;
  if (type === "data") return <DateField type={type} {...props} />;
  return <TextField type={type} {...props} />;
};

export default FieldBuilder;
