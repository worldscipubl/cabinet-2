import React from 'react';
import classNames from "classnames";
import styles from "./FormFieldLabel.module.scss";

const FormFieldLabel = ({className, label, description}) => {
    return (
        <div className={classNames(className)}>
            <h4 className={classNames("text", styles.textField__label)}>{label}</h4>
            <p className={classNames("text text_color_gray", styles.textField__description)}>
                {description}
            </p>
        </div>
    );
};

export default FormFieldLabel;
