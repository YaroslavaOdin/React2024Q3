import { useState } from "react";

const ErrorBtn = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const throwNewError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error("Something went wrong.");
  }

  return (
    <button className="error-btn" onClick={throwNewError}>
      Test error
    </button>
  );
};

export default ErrorBtn;
