import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Field.module.scss";
import styles from "./Field.module.scss";
import errorImg from "../../common/images/icons/error.svg";

const FileField = ({
                     label,
                     description,
                     defaultValue = null,
                     defaultError = "",
                     helperText,
                     className,
                     options: { startIcon, endIcon } = {},
                     handlers: { handlerEndIcon, handlerField } = {},
                     ...props
                   }) => {
  const [error, setError] = useState(defaultError);
  const [value, setValue] = useState(defaultValue);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setError(defaultError);
  }, [defaultError]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = ({ target }) => {
    if (!target) return;
    const name = target?.name;
    const files = target?.files;
    const isFileExists = !!files.length;
    let err = "";

    if (!isFileExists) {
      if (value) return;
      err = "Пожалуйста, заполните это поле";
    }

    setError(err);
    setValue(files);
    files.length > 1 ?
      setFileName(`Число файлов: ${files.length}`) :
      setFileName(files[0]?.name);
    handlerField && handlerField(name, files, err);
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
      <div className={classNames(styles.field__container, styles.field__input)}>
        {!!error && (
          <img className={classNames(styles.field__icon, styles.field__icon_start)} src={errorImg} alt="start-icon" />
        )}
        {startIcon && (
          <img className={classNames(styles.field__icon, styles.field__icon_start)} src={startIcon}
               alt="start-icon" />
        )}

        <span
          className={classNames(styles.field__input, styles.field__input_file)}>{fileName || "Файл не выбран"}</span>
        <label className={styles.field__btn}>
          <span>Выберете файл</span>
          <input className={styles.field__fileInput} {...props} onChange={handleChange} required multiple />
        </label>
      </div>
      <div>
        <p className={classNames(styles.field__helper, styles.field__helper_error)}>{error}</p>
        <p className={classNames(styles.field__helper)}>{helperText}</p>
      </div>
    </div>
  );
};

export default FileField;
