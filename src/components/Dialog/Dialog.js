import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../Modal";
import cn from "./Dialog.module.scss";

const Dialog = ({className, children, open, setOpen}) => {
    return (
        <Modal className={classNames(cn.Dialog, className)}
               overlay
               open={open}
               setOpen={setOpen}>
            <div className={classNames(cn.Content)}>
                {children}
            </div>
        </Modal>
    );
};

Dialog.defaultProps = {
    open: false,
    setOpen: null,
    anchorEl: null,
    autoFocus: true,
    children: null
};

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    anchorEl: PropTypes.element,
    autoFocus: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default Dialog;
