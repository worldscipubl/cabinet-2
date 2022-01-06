import React from 'react';
import classNames from "classnames";
import FormFieldLabel from "../FormFieldLabel";
import cn from "./FormFieldRow.module.scss"

const FormFieldRow = ({className, children, label, description}) => {
    return (
        <div className={classNames(className, cn.Wrapper)}>
            <FormFieldLabel className={classNames(cn.Start)} label={label} description={description}/>
            <div className={classNames(cn.End)}>
                {children}
            </div>
        </div>
    );
};

export default FormFieldRow;
