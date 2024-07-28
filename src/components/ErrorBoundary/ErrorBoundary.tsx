import React, { ReactNode } from "react";
import "./ErrorBoundary.css";
import ThemeContext from "../../theme-context/themeContext";

interface DefaultState {
  hasError: boolean;
}

interface ErrorProps {
  hasError: boolean;
  children: ReactNode;
}

class ErrorBoundary extends React.Component {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: props.hasError ? props.hasError : false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public render(): ReactNode {
    const { hasError } = this.state as DefaultState;
    const { children } = this.props as ErrorProps;

    if (hasError) {
      return (
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div className={`theme-${theme} error-container`}>
              <h1 className="error_text">Something went wrong.</h1>
              <button
                className="error_button"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
