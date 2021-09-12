import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./FormField.module.scss";
import errorImg from "../../common/images/icons/error.svg";
import pencilImg from "../../common/images/icons/pencil.svg";

const FormField = ({
                     className,
                     component,
                     name,
                     label,
                     description,
                     defaultValue,
                     defaultError,
                     propsInput = {},
                     helperText = "Нажмите Enter, чтобы сохранить изменения",
                     options: { startIcon, endIcon } = {},
                     handlers: { handleFieldChange, handleFieldSubmit } = {}
                   }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(defaultError);
  const [disabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(true);

  useEffect(() => {
    if (value !== defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (error !== defaultError) setError(defaultError);
  }, [defaultError]);

  const resetField = () => {
    setValue(defaultValue);
    setError(defaultError);
    setReadOnly(true);
  };

  const handleBlur = (event) => {
    !disabled && resetField();
  };
  const handleKeyDown = (event) => {
    if (!event) return;

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;
    if (!key) return;

    if (key === "Escape") {
      resetField();
    } else if (key === "Enter") {
      if (!!error || !handleFieldSubmit) return;
      setReadOnly(true);
      setDisabled(true);
      handleFieldSubmit(name, value)
        .then((error) => {
        })
        .catch((error) => {
          resetField();
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };
  const handleChange = (event) => {
    const input = event.target;
    if (!input) return;

    const value = input?.value;
    //  Пропустить value через переданный валидатор
    if (!input.validity.valid) {
      setError("Ошибка!");
    } else {
      setError("");
    }

    //  Пропустить value через маску

    setValue(value);
  };

  const styleField = classNames(styles.textField, className, {
    [styles.readonly]: isReadOnly,
    [styles.error]: !!error,
    [styles.disabled]: disabled
  });

  return (
    <div className={styleField}>
      <label>
        <h4 className={classNames("text", styles.textField__label)}>{label}</h4>
        <p className={classNames("text text_color_gray", styles.textField__description)}>
          {description}
        </p>
        <div className={styles.textField__container}>
          {isReadOnly && !!error && (
            <img className={styles.startIcon} src={errorImg} alt="start-icon" />
          )}

          {isReadOnly && (
            <img
              className={styles.endIcon}
              src={pencilImg}
              alt="end-icon"
              onClick={() => setReadOnly(false)}
            />
          )}

          {isReadOnly && !defaultValue && (
            <i className={classNames("button button_type_tabs active", styles.actionBtn)}
               onClick={() => setReadOnly(false)}>
              Добавить
            </i>
          )}

          {component && <component.type
            {...propsInput}
            name={name}
            readOnly={isReadOnly || false}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value || ""}
          />}
        </div>
      </label>
      <div className={classNames(styles.textField__helper)}>
        <p className={classNames(styles.textField__helperMsgError)}>{error}</p>
        <p className={classNames(styles.textField__helperMsg)}>{!isReadOnly && helperText}</p>
      </div>
    </div>
  );
};

export default FormField;
