import React, { Component } from "react";

import PropTypes from "prop-types";
import { ReactComponent as ErrorIllustration } from "../../common/images/illustrations/error.svg";
import EmptyState from "../EmptyState/EmptyState";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    // Properties
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <EmptyState
          image={
            <ErrorIllustration style={{ width: "100%", height: "100%" }} />
          }
          title="Что-то пошло не так"
          description="Не удалось загрузить приложение"
        />
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  // Properties
  children: PropTypes.array.isRequired,
};

export default ErrorBoundary;
