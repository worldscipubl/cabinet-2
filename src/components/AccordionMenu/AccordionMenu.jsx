import React, { useState, useEffect, useCallback } from "react";
import "./AccordionMenu.scss";

export const AccordionMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [isOpenItem, setOpenItem] = useState();

  useEffect(() => {
    setChildren(() =>
      props.children.length ? props.children : [props.children]
    );
  }, [props.children]);

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
    <div className="accordion-menu">
      {children.map((item) => (
        <item.type
          key={item.props.id}
          {...item.props}
          open={item.props.id === isOpenItem}
          onClick={() => toggleItem(item.props.id)}
        ></item.type>
      ))}
    </div>
  );
};
