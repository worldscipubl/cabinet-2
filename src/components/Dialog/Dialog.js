import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cn from "./Dialog.module.scss";
import Modal from "../Modal";

const Dialog = ({ className, children, open, setOpen }) => {

  return (
    <Modal className={classNames(cn.Dialog, className)}
           overlay
           open={open}
           setOpen={setOpen}>
      <div className={classNames(cn.Content)}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ex id illum inventore natus nesciunt
          quisquam recusandae similique. Assumenda dignissimos dolore enim iure nam provident quis quos ratione sequi,
          veritatis!
        </p>
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
