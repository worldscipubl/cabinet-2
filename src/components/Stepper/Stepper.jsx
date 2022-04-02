import React, { useState, useEffect, useCallback } from "react";
import "./Stepper.scss";
import classNames from "classnames";

const Stepper = ({ className, currentStage, children }) => {
  const [openItem, setOpenItem] = useState(currentStage);

  useEffect(() => {
    setOpenItem(currentStage);
  }, [currentStage]);

  const toggleItem = useCallback((id) => {
    setOpenItem((prev) => {
      if (id === prev) {
        return "";
      } else {
        return id;
      }
    });
  }, []);
  return (
    <ol className={classNames("stepper", className)}>
      {children.map((item) => (
        <item.type
          key={item.props.id}
          {...item.props}
          state={{
            ...item.props.state,
            open: item.props.id === openItem,
            complete: item.props.id < currentStage,
            disabled: item.props.id > currentStage,
          }}
          onClick={() => toggleItem(item.props.id)}
        ></item.type>
      ))}
    </ol>
  );
};

export default Stepper;
