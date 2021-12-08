import React from "react";
import classNames from "classnames";
import styles from "../Field.module.scss";
import errorImg from "../../../common/images/icons/error.svg";

const TextField = ({
                     label,
                     description,
                     helperText,
                     className,
                     states: { error, value } = {},
                     setters: { setError, setValue } = {},
                     options: { startIcon, endIcon } = {},
                     handlers: { handlerEndIcon, handlerStartIcon, handlerField } = {},
                     ...props
                   }) => {

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
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
      <input className={styles.field__input} {...props} value={value || ""} onChange={handleChange} required />
    </div>
  );
};

export default TextField;
