import React from "react";
import "./Input.scss";

const Input = ({ className, inputRef, fileName, ...props }) => {
  if (props?.type === "file") delete props?.value;

  if (props?.type === "file")
    return <div className="field-file">
      <input className="field-file__input-original" ref={inputRef} {...props} />
      <div className="field-file__input-surrogate">
        {fileName || props.placeholder}
      </div>
    </div>;

  return <input className={className} ref={inputRef} {...props} />;
};

export default Input;
