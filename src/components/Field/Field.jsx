import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Field.module.scss";
import errorImg from "../../common/images/icons/error.svg";

const Field = ({
                 className,
                 component,
                 name,
                 idAuthor = null,
                 label,
                 description,
                 defaultValue = null,
                 defaultError = null,
                 propsInput = {},
                 helperText = "",
                 options: { startIcon, endIcon } = {},
                 handlers: { handleChange, handlerEndIcon } = {}
               } = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(defaultError);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    resetField();
  }, [defaultValue]);

  useEffect(() => {
    if (error !== defaultError) setError(defaultError);
  }, [defaultError]);

  const resetField = () => {
    setValue(defaultValue);
    setDisabled(false);
    setFileName("");
  };

  const handleChangeInner = (event) => {
    const input = event.target;
    if (!input) return;
    let value = null;

    if (input.type === "file") {
      const value = input?.files;
      if (!value) {
        setError("Ошибка!");
      } else {
        setError("");
      }
      setFileName(value[0]?.name);
    } else {
      value = input?.value;
      //  Пропустить value через переданный валидатор
      if (!input.validity.valid) {
        setError("Пожалуйста, заполните это поле");
      } else {
        setError("");
      }
    }

    //  Пропустить value через маску
    setValue(value);
    if (!handleChange) return;
    handleChange(idAuthor, name, value);
  };

  const styleField = classNames(styles.textField, className, {
    [styles.error]: !!error,
    [styles.disabled]: disabled
  });

  return (
    <div className={styleField}>
      <div>
        <h4 className={classNames("text", styles.textField__label)}>{label}</h4>
        <p className={classNames("text text_color_gray", styles.textField__description)}>
          {description}
        </p>
        <div className={styles.textField__container}>
          {!!error && (
            <img className={styles.startIcon} src={errorImg} alt="start-icon" />
          )}

          {endIcon && (
            <img
              className="end-icon"
              src={endIcon}
              alt="end-icon"
              onClick={handlerEndIcon}
            />
          )}

          {component && <component.type
            className={classNames(styles.textField__input)}
            inputRef={inputRef}
            {...propsInput}
            name={name}
            onChange={handleChangeInner}
            fileName={fileName || ""}
            value={value || ""}
          />}
        </div>
      </div>
      <div className={classNames(styles.textField__helper)}>
        <p className={classNames(styles.textField__helperMsgError)}>{error}</p>
        <p>{helperText}</p>
      </div>
    </div>
  );
};

export default Field;
