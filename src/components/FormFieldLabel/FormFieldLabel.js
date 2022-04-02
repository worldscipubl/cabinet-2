import React from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./FormFieldLabel.module.scss";

const FormFieldLabel = ({ className, label, description, isLoading }) => {
  return (
    <div className={classNames(className, styles.Wrapper)}>
      {isLoading ? (
        <Skeleton className={classNames(styles.Skeleton)} />
      ) : (
        <h4 className={classNames("text", styles.textField__label)}>{label}</h4>
      )}
      {description && (
        <p
          className={classNames(
            "text text_color_gray",
            styles.textField__description
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default FormFieldLabel;
