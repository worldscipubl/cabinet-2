import React, { Fragment, useState, cloneElement } from "react";
import classNames from "classnames";
import errorImg from "../../../common/images/icons/error.svg";
import cn from "../Field.module.scss";
import SpoilerArrow from "../../SpoilerArrow";

const SelectField = ({
  label,
  description,
  helperText,
  className,
  options,
  children,
  optionAdd: { labelBtn, handleBtn } = {},
  states: { error, value } = {},
  setters: { setError, setValue } = {},
  options: { startIcon, endIcon } = {},
  handlers: { handlerEndIcon, handlerStartIcon, handlerField } = {},
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  const [valueLabel, setValueLabel] = useState("");

  const handleChange = (value) => {
    setValue?.(value);
    handlerField?.(props?.name, value, null);
    setOpen(false);
  };

  return (
    <div className={cn.field__container}>
      {!!error && (
        <img
          className={classNames(cn.field__icon, cn.field__icon_start)}
          src={errorImg}
          alt="start-icon"
        />
      )}
      {startIcon && (
        <img
          className={classNames(cn.field__icon, cn.field__icon_start)}
          src={startIcon}
          alt="start-icon"
        />
      )}
      {endIcon && (
        <img
          className={classNames(cn.field__icon, cn.field__icon_end)}
          src={endIcon}
          alt="end-icon"
          onClick={handlerEndIcon}
        />
      )}
      <SpoilerArrow
        className={classNames(cn.field__icon, cn.field__icon_end)}
        isOpen={isOpen}
      />
      <input
        className={classNames(cn.field__input, cn.field__select)}
        {...props}
        value={valueLabel || ""}
        onClick={() => setOpen((prevState) => !prevState)}
        required
        readOnly
      />
      <ul
        className={classNames(cn.field__input, cn.field__list, {
          [cn.isOpen]: isOpen,
        })}
      >
        {options?.map((item, index) =>
          children ? (
            <Fragment key={index}>
              {cloneElement(children, {
                item,
                onClick: ({ value, label }) => {
                  handleChange(value);
                  setValueLabel(label || "");
                },
              })}
            </Fragment>
          ) : (
            <SelectFieldItem
              {...item}
              key={index}
              onClick={() => handleChange(value)}
            />
          )
        )}
        {labelBtn && (
          <li
            className={classNames(
              cn.option,
              cn.optionAdd,
              "text text_size_default"
            )}
            key={"add"}
          >
            {labelBtn}
          </li>
        )}
      </ul>
    </div>
  );
};

const SelectFieldItem = ({ label, description, onClick }) => (
  <li
    className={classNames(cn.option, "text text_size_default")}
    onClick={onClick}
  >
    <span className={classNames()}>{label}</span>
    <span className={classNames("text_color_gray")}>{description}</span>
  </li>
);

export default SelectField;
