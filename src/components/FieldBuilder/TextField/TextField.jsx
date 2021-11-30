import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "../Field.module.scss";
import errorImg from "../../../common/images/icons/error.svg";

const TextField = ({
                     label,
                     description,
                     defaultValue = "",
                     defaultError = "",
                     helperText,
                     className,
                     options: { startIcon, endIcon } = {},
                     handlers: { handlerEndIcon, handlerStartIcon, handlerField } = {},
                     ...props
                   }) => {
  const [error, setError] = useState(defaultError);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setError(defaultError);
  }, [defaultError]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);


  const handleChange = ({ target }) => {
    if (!target) return;
    const name = target?.name;
    const value = target?.value;
    let err = "";

    if (!target.validity.valid) {
      err = "Пожалуйста, заполните это поле";
    }

    setError(err);
    setValue(value);
    handlerField && handlerField(name, value, err);
  };

  return (
    <div className={classNames(styles.field, className, {
      [styles.error]: !!error,
      [styles.startIcon]: !!startIcon,
      [styles.endIcon]: !!endIcon
    })}>
      <h4 className={classNames(styles.field__label, "text")}>{label}</h4>
      <p className={classNames(styles.field__description, "text text_color_gray")}>
        {description}
      </p>
      <div className={styles.field__container}>
        {!!error && (
          <img className={classNames(styles.field__icon, styles.field__icon_start)} src={errorImg} alt="start-icon" />
        )}
        {startIcon && (
          <img className={classNames(styles.field__icon, styles.field__icon_start)} src={startIcon}
               alt="start-icon" />
        )}
        {endIcon && (
          <img
            className={classNames(styles.field__icon, styles.field__icon_end)}
            src={endIcon}
            alt="end-icon"
            onClick={handlerEndIcon}
          />
        )}
        <input className={styles.field__input} {...props} value={value} onChange={handleChange} required />
      </div>
      <div>
        <p className={classNames(styles.field__helper, styles.field__helper_error)}>{error}</p>
        <p className={classNames(styles.field__helper)}>{helperText}</p>
      </div>
    </div>
  );
};

export default TextField;
