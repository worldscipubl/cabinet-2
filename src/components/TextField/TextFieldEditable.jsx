import React, { useState } from "react";
import classNames from "classnames";
import "./TextField.scss";
import pencilImg from "../../common/images/icons/pencil.svg";

const TextFieldEditable = ({
  label,
  description,
  children,
  error,
  helperText = "Нажмите Enter, чтобы сохранить изменения",
  className,
  options: { startIcon, endIcon } = {},
  handlers: { handleChange, handleFieldSubmit } = {},
}) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState({});
  const textFieldStyle = classNames("text-field", className, {
    error: error,
    readonly: isReadOnly,
  });
  const handleKeyDown = (event) => {
    if (!event) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === "Escape") {
      setReadOnly(true);
    } else if (key === "Enter") {
      handleFieldSubmit && handleFieldSubmit(value);
      setReadOnly(true);
    }
  };

  return (
    <div className={textFieldStyle}>
      <label>
        <h4 className="text text-field__label">{label}</h4>
        <p className="text text_color_gray text-field__description">
          {description}
        </p>
        <div className="text-field__container">
          {startIcon && (
            <img className="start-icon" src={startIcon} alt="start-icon" />
          )}

          {isReadOnly && (
            <img
              className="end-icon"
              src={pencilImg}
              alt="end-icon"
              onClick={() => setReadOnly(false)}
            />
          )}

          <children.type
            {...children.props}
            readOnly={isReadOnly || false}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              const res = handleChange && handleChange(e);
              if (!res) return;
              setValue({
                ...value,
                ...res,
              });
            }}
            onBlur={() => setReadOnly(true)}
            value={
              isReadOnly || !value?.[children.props?.name]
                ? children.props?.value
                : value?.[children.props?.name]
            }
          />
        </div>
      </label>
      <div className="text-field__helper">
        <p className="text-field__helper-msg">{!isReadOnly && helperText}</p>
      </div>
    </div>
  );
};

export default TextFieldEditable;
