import React from "react";
import "./FromErrorList.scss";

const FromErrorList = ({ errorForm }) => {

  const getItems = () => {
    if (Array.isArray(errorForm))
      return errorForm.map((err, index) =>
        <li className="error-form-list__item text text_color_red" key={err + index}>- {err}</li>);

    return errorForm && errorForm.split(".,").map((err, index) =>
      <li className="error-form-list__item text text_color_red" key={err + index}>- {err}</li>);
  };

  return (
    <ul className="error-form-list">
      {getItems()}
    </ul>
  );
};

export default FromErrorList;
