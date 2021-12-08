import React from "react";

const FormErrorsBoard = ({ dataErrors }) => {
  return (
    <ul>
      {dataErrors.map((itemError) => {
        return <li className="text text_color_red">{itemError}</li>;
      })}
    </ul>
  );
};

export default FormErrorsBoard;
