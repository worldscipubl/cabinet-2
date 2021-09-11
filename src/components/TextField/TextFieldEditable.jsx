import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./TextField.scss";
import pencilImg from "../../common/images/icons/pencil.svg";
import errorImg from "../../common/images/icons/error.svg";

const TextFieldEditable = ({
                             name,
                             label,
                             description,
                             children,
                             error,
                             requiredError,
                             helperText = "Нажмите Enter, чтобы сохранить изменения",
                             className,
                             defaultValue,
                             options: { startIcon, endIcon } = {},
                             handlers: { handleChange, handleSubmit } = {}
                           }) => {
  const [isReadOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState({});
  const textFieldStyle = classNames("text-field", className, {
    error: !!error,
    readonly: isReadOnly,
    required: !!requiredError
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
      setValue({ [name]: defaultValue });
    } else if (key === "Enter") {
      handleSubmit && handleSubmit(value);
      setReadOnly(true);
    }
  };

  useEffect(() => {
    if (!defaultValue) return;
    setValue({ [name]: defaultValue });
  }, [defaultValue, name]);

  return (
    <div className={textFieldStyle}>
      <label>
        <h4 className="text text-field__label">{label}</h4>
        <p className="text text_color_gray text-field__description">
          {description}
        </p>
        <div className="text-field__container">
          {isReadOnly && requiredError && (
            <img className="start-icon" src={errorImg} alt="start-icon" />
          )}

          {isReadOnly && (
            <img
              className="end-icon"
              src={pencilImg}
              alt="end-icon"
              onClick={() => setReadOnly(false)}
            />
          )}

          {isReadOnly && requiredError && (
            <i className="button button_type_tabs active action-btn"
               onClick={() => setReadOnly(false)}>
              Добавить
            </i>
          )}

          <children.type
            {...children.props}
            name={name}
            readOnly={isReadOnly || false}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              const res = handleChange && handleChange(e);
              if (!res) return;
              setValue({
                ...value,
                ...res
              });
            }}
            onBlur={() => setReadOnly(true)}
            value={value?.[name] || ""}
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
