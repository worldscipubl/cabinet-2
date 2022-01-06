import React from "react";
import PropTypes from "prop-types";

const IonIcon = ({className, name, ...props}) => {
    return (
        <ion-icon class={className} {...props} name={name}/>
    );
};

IonIcon.propTypes = {
    name: PropTypes.string.isRequired
};

export default IonIcon;
