import React, {forwardRef, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./Modal.module.scss";

const Modal = forwardRef(({className, classNameWrapper, overlay, children, open, setOpen}, ref) => {

    function handleWrapper(event) {
        event.preventDefault();
        const {target, currentTarget} = event;

        if (target === currentTarget)
            setOpen(false);
    }

    function handleKeyDown(event) {
        if (event.keyCode === 27) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (!open) return;
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    return (
        <div className={classNames(cn.Wrapper, classNameWrapper, {[cn.open]: open, [cn.overlay]: overlay})}
             onClick={handleWrapper}>
            <div className={classNames(cn.Inner, className)} ref={ref} onClick={handleWrapper}>
                {children}
            </div>
        </div>
    );
});

Modal.defaultProps = {
    open: false,
    overlay: false,
    setOpen: null,
    anchorEl: null,
    autoFocus: true,
    children: null
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    overlay: PropTypes.bool,
    anchorEl: PropTypes.element,
    autoFocus: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default Modal;
