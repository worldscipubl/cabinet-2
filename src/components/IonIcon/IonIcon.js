import React from "react";
import PropTypes from "prop-types";

const IonIcon = ({ className, name, ...props }) => {
  return (
    <ion-icon class={className} name={name} {...props} />
  );
};

IonIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export default IonIcon;
