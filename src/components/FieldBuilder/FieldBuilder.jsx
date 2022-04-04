import React, { useEffect, useState } from "react";
import FileField from "./FileField";
import SelectField from "./SelectField";
import DateField from "./DateField";
import TextField from "./TextField";
import FieldWrapper from "./FieldWrapper";

const FieldBuilder = ({
  type,
  defaultError,
  defaultValue,
  handleChange,
  ...props
}) => {
  const [error, setError] = useState(defaultError);
  const [value, setValue] = useState(defaultValue);
  const [fileName, setFileName] = useState("");

  // useEffect(() => {
  //   if (!handleChange) return;
  //   const { handleChange: handler, ...props } = handleChange();
  //   if (!handler) return;
  //   handler({ ...props, value });
  // }, [value, handleChange]);

  useEffect(() => {
    setError(defaultError);
  }, [defaultError]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const getFieldByType = ({ type, ...props }) => {
    if (type === "file") return <FileField type={type} {...props} />;
    if (type === "select") return <SelectField type={type} {...props} />;
    if (type === "data") return <DateField type={type} {...props} />;
    return <TextField type={type} {...props} />;
  };

  return (
    <FieldWrapper {...props} isHelperBox>
      {getFieldByType({
        type,
        ...props,
        states: { error, value, fileName },
        setters: { setError, setValue, setFileName },
      })}
    </FieldWrapper>
  );
};

export default FieldBuilder;
