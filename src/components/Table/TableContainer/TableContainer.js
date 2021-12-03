import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./TableContainer.module.scss";

const TableContainer = ({ className, children, ...props }) => {
  const Wrapper = props?.component;

  return (
    <Wrapper className={classNames(cn.TableContainer, className)}>
      {children}
    </Wrapper>
  );
};

TableContainer.propTypes = {
  children: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
};


export default TableContainer;
