import React from "react";
import classNames from "classnames";
import styles from "../Field.module.scss";

const FieldWrapper = ({
  label,
  description,
  error,
  helperText,
  isHelperBox = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(styles.field, className, {
        [styles.error]: !!error,
        [styles.startIcon]: !!props?.options?.startIcon,
        [styles.endIcon]: !!props?.options?.endIcon,
      })}
    >
      {label && (
        <h4 className={classNames(styles.field__label, "text")}>{label}</h4>
      )}
      {description && (
        <p
          className={classNames(
            styles.field__description,
            "text text_color_gray"
          )}
        >
          {description}
        </p>
      )}
      {children}
      <div className={classNames({ [styles.field__helperBox]: isHelperBox })}>
        <p
          className={classNames(
            styles.field__helper,
            styles.field__helper_error
          )}
        >
          {error}
        </p>
        <p className={classNames(styles.field__helper)}>{helperText}</p>
      </div>
    </div>
  );
};

export default FieldWrapper;
