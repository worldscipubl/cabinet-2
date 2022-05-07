import React, {useEffect, useState} from "react";
import classNames from "classnames";
import errorImg from "../../../common/images/icons/error.svg";
import styles from "../Field.module.scss";

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
  const [isReadOnly, setIsReadOnly] = useState(false)

  useEffect(() => {
    //Если поле по дефолту заполнено то только для чтения и исключение из валидации
    if(value) {
      setIsReadOnly(true)
      let err = "";
      setError();
      setValue(value);
      handlerField && handlerField(props.fieldName, value, err);
    }
  },[]);

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
      {/*{!!error && (*/}
      {/*  <img*/}
      {/*    className={classNames(styles.field__icon, styles.field__icon_start)}*/}
      {/*    src={errorImg}*/}
      {/*    alt="start-icon"*/}
      {/*  />*/}
      {/*)}*/}
      {/*{startIcon && (*/}
      {/*  <img*/}
      {/*    className={classNames(styles.field__icon, styles.field__icon_start)}*/}
      {/*    src={startIcon}*/}
      {/*    alt="start-icon"*/}
      {/*  />*/}
      {/*)}*/}
      {/*{endIcon && (*/}
      {/*  <img*/}
      {/*    className={classNames(styles.field__icon, styles.field__icon_end)}*/}
      {/*    src={endIcon}*/}
      {/*    alt="end-icon"*/}
      {/*    onClick={handlerEndIcon}*/}
      {/*  />*/}
      {/*)}*/}
      {
        !isReadOnly
        ?
          <input
            className={!error ? classNames(styles.field__input) : classNames(styles.field__input, styles.errorField)}
            {...props}
            value={value || ""}
            onChange={handleChange}
            required
            placeholder={props.placeholder || ""}
          />
        :
          <input
            className={!error ? classNames(styles.field__input) : classNames(styles.field__input, styles.errorField)}
            {...props}
            value={value || ""}
            onChange={handleChange}
            required
            placeholder={props.placeholder || ""}
            readOnly
          />

      }

      {/*<input*/}
      {/*  id="inputTextField"*/}
      {/*  className={!isReadOnly ? classNames(styles.field__input) : classNames(styles.field__input, styles.disabledField)}*/}
      {/*  {...props}*/}
      {/*  value={value || ""}*/}
      {/*  onChange={handleChange}*/}
      {/*  required*/}
      {/*  // disabled={isDisabled}*/}
      {/*  placeholder={props.placeholder || ""}*/}
      {/*/>*/}
    </div>
  );
};

export default TextField;
