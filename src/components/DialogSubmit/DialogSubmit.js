import React from "react";
import classNames from "classnames";
import cn from "./DialogSubmit.module.scss";

const DialogSubmit = ({ className, error, label, handleSubmit, disable }) => {
  return (
    <div className={classNames(className, cn.Wrapper)}>
      {error && (
        <p className={classNames(cn.Error, "text text_color_red")}>{error}</p>
      )}
      <button
        className={classNames(cn.SubmitBtn, "button button_type_main", {
          [cn.disable]: disable,
        })}
        onClick={handleSubmit}
      >
        {label}
      </button>
    </div>
  );
};

export default DialogSubmit;
