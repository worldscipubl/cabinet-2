import React, { useEffect, useRef, useState } from "react";
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
                     defaultError = null,
                     isViewOnly = false,
                     propsInput = {},
                     helperText = "Нажмите Enter, чтобы сохранить изменения",
                     options: { startIcon, endIcon } = {},
                     handlers: { handleFieldSubmit, handleFieldFileSubmit } = {}
                   }) => {
  const [value, setValue] = useState(defaultValue);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(defaultError);
  const [disabled, setDisabled] = useState(false);
  const [isReadOnly, setReadOnly] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    resetField();
  }, [defaultValue]);

  useEffect(() => {
    if (error !== defaultError) setError(defaultError);
  }, [defaultError]);

  const resetField = () => {
    setValue(defaultValue);
    setError(defaultError);
    setDisabled(false);
    setReadOnly(true);
    setFileName("");
  };

  const handleBlur = (event) => {
    !disabled && !error && resetField();
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
      submitField();
    }
  };

  const submitField = () => {
    if (!!error || !handleFieldSubmit) return;
    setReadOnly(true);
    setDisabled(true);

    handleFieldSubmit(name, value)
      .catch((err) => {
        resetField();
        setError(err);
      });
  };

  const submitFieldFile = () => {
    if (!!error || !handleFieldFileSubmit) return;
    setReadOnly(true);
    setDisabled(true);

    const formData = new FormData();
    // TODO: userTypeFileId <- Должен приходить извне
    formData.append("userTypeFileId", 1);

    for (let i = 0; i < value.length; i++) {
      formData.append("UserFile[file][]", value[i]);
    }

    console.log(formData);
    handleFieldFileSubmit(formData)
      .catch((err) => {
        resetField();
        setError(err);
      });
  };

  const handleChange = (event) => {
    const input = event.target;
    if (!input) return;

    if (input.type === "file") {
      const files = input?.files;
      if (!files) {
        setError("Ошибка!");
      } else {
        setError("");
      }
      setFileName(files[0]?.name);
      setValue(files);
    } else {
      const value = input?.value;
      //  Пропустить value через переданный валидатор
      if (!input.validity.valid) {
        setError("Ошибка!");
      } else {
        setError("");
      }
      //  Пропустить value через маску
      setValue(value);
    }
  };

  const styleField = classNames(styles.textField, className, {
    [styles.readonly]: isReadOnly,
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
          {isReadOnly && !!error && (
            <img className={styles.startIcon} src={errorImg} alt="start-icon" />
          )}

          {isReadOnly && !isViewOnly && (
            <img
              className={styles.endIcon}
              src={pencilImg}
              alt="end-icon"
              onClick={() => {
                if (propsInput.type === "file") {
                  inputRef.current.click();
                } else {
                  if (inputRef) inputRef.current.focus();
                  setReadOnly(false);
                }
              }}
            />
          )}

          {isReadOnly && !isViewOnly && (!defaultValue || fileName) && (
            <i className={classNames("button button_type_tabs active", styles.actionBtn)}
               onClick={() => {
                 if (fileName) {
                   submitFieldFile();
                   return;
                 }

                 if (propsInput.type === "file")
                   inputRef.current.click();
                 else {
                   if (inputRef) inputRef.current.focus();
                   setReadOnly(false);
                 }
               }}>
              {fileName ? "Отправить" : "Добавить"}
            </i>
          )}

          {component && <component.type
            className={classNames(styles.textField__input)}
            inputRef={inputRef}
            {...propsInput}
            name={name}
            readOnly={isReadOnly || false}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
            fileName={fileName || ""}
            value={value || ""}
          />}
        </div>
      </div>
      <div className={classNames(styles.textField__helper)}>
        <p className={classNames(styles.textField__helperMsgError)}>{error}</p>
        <p className={classNames(styles.textField__helperMsg)}>{!isReadOnly && helperText}</p>
      </div>
    </div>
  );
};

export default FormField;
