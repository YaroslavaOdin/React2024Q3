import React, { ReactNode } from "react";
import ThemeContext from "../../theme-context/themeContext";
import styles from "../../styles/errorBoundary.module.css";

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
            <div className={`theme-${theme} ${styles.errorContainer}`}>
              <h1 className={styles.errorText}>Something went wrong.</h1>
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
