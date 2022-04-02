import React from "react";
import classNames from "classnames";
import IonIcon from "../../IonIcon";
import cn from "./SelectOption.module.scss";

const SelectOption = ({
  className,
  handleSelect,
  handleOption,
  title,
  options,
}) => {
  function handlerOption(id) {
    if (!id) return;
    handleSelect("");
    handleOption && handleOption(id);
  }

  return (
    <div className={classNames(cn.Wrapper)}>
      <div className={classNames(cn.Header)}>
        <IonIcon
          className={classNames(cn.BackBtn)}
          name="arrow-back-outline"
          onClick={() => handleSelect("")}
        />
        <span className={classNames(cn.Title, "text")}>{title}</span>
      </div>
      <ul className={classNames(cn.List)}>
        {options &&
          options.map(({ id, label, icon }) => (
            <li
              className={classNames(cn.Item)}
              key={id}
              onClick={() => handlerOption(id)}
            >
              <p className={classNames(cn.ItemLabel, "text")}>
                <span>({id?.toUpperCase()})</span> {label}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SelectOption;
