import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import styles from "../FormField/FormField.module.scss";
import FormFieldLabel from "../FormFieldLabel";

const FormFieldContainer = ({ className, children, ...props }) => {
  const {
    label,
    description,
    isLoading,
    error,
    helperText,
    isReadOnly,
    disabled,
  } = props;

  const styleField = classNames(styles.textField, className, {
    [styles.readonly]: isReadOnly,
    [styles.error]: !!error,
    [styles.disabled]: disabled,
  });

  return (
    <div className={styleField}>
      <div>
        <FormFieldLabel label={label} description={description} />
        {isLoading ? (
          <div className={styles.textField__input}>
            <Skeleton className={styles.textField__skeleton} />
          </div>
        ) : (
          <div className={styles.textField__container}>{children}</div>
        )}
      </div>
      <div className={classNames(styles.textField__helper)}>
        <p className={classNames(styles.textField__helperMsgError)}>{error}</p>
        <p className={classNames(styles.textField__helperMsg)}>
          {!isReadOnly && helperText}
        </p>
      </div>
    </div>
  );
};

FormFieldContainer.defaultProps = {
  label: "",
  description: "",
  isLoading: false,
  error: null,
  helperText: "",
  isReadOnly: false,
  disabled: false,
};

FormFieldContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isLoading: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormFieldContainer;
