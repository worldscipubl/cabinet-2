import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../Modal";
import cn from "./DropDownHeaderMenu.module.scss";

const DropDownHeaderMenu = ({ className, children, open, setOpen, anchorEl }) => {
  const ref = useRef();


  useEffect(() => {
    const currentEl = ref.current;
    const anchor = anchorEl?.current;
    if (!anchor || !currentEl) return;
    const offsetRight = (window.innerWidth - (anchor.offsetLeft + anchor.offsetWidth)) || 0;
    currentEl.style.setProperty("--offset-right", `${offsetRight}px`);
  }, [anchorEl]);

  return (
    <Modal className={classNames(cn.Inner, className)}
           classNameWrapper={classNames(cn.Wrapper)} open={open}
           setOpen={setOpen}
           ref={ref}>
      <div className={classNames(cn.Content)}>
        {children}
      </div>
    </Modal>
  );
};

DropDownHeaderMenu.defaultProps = {
  open: false,
  setOpen: null,
  anchorEl: null,
  autoFocus: true,
  children: null
};

DropDownHeaderMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  autoFocus: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default DropDownHeaderMenu;
