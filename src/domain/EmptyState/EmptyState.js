import React from "react";
import PropTypes from "prop-types";

function EmptyState(props) {
  let imageWidth;
  let imageHeight;
  let variant;

  switch (props.size) {
    case "small":
      imageWidth = 40;
      imageHeight = 40;
      variant = "h6";
      break;

    case "medium":
      imageWidth = 60;
      imageHeight = 60;
      variant = "h6";
      break;

    case "large":
      imageWidth = 100;
      imageHeight = 100;
      variant = "h4";
      break;

    default:
      imageWidth = 60;
      imageHeight = 60;
      variant = "h5";
      break;
  }

  if (props.type === "page") {
    return (
      <div
        style={{
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
          textAlign: "center",
        }}
      >
        {props.image && (
          <div
            style={{
              width: `${imageHeight}%`,
              height: `${imageHeight}%`,
              margin: "auto",
            }}
          >
            {props.image}
          </div>
        )}

        {props.title && (
          <div mb={!props.description && props.button ? 2 : 0.5}>
            <h3 className="text text_size_title text_weight_bold">
              {props.title}
            </h3>
          </div>
        )}

        {props.description && (
          <div mb={props.button && 3}>
            <p className="text">{props.description}</p>
          </div>
        )}

        {props.button && props.button}
      </div>
    );
  }

  if (props.type === "card") {
    return (
      <div padding={props.padding} textAlign="center">
        {props.image && (
            <div
                style={{
                  width: `${imageHeight}%`,
                  height: `${imageHeight}%`,
                  margin: "auto",
                }}
            >
              {props.image}
            </div>
        )}

        {props.title && (
          <div mb={!props.description && props.button ? 2 : 0}>
            <h3 className="text text_size_title text_weight_bold">
              {props.title}
            </h3>
          </div>
        )}

        {props.description && (
          <div mb={props.button && 2}>
            <p>{props.description}</p>
          </div>
        )}

        {props.button && props.button}
      </div>
    );
  }

  return null;
}

EmptyState.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

EmptyState.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,
};

export default EmptyState;
