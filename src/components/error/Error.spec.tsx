import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ErrorBoundary from "./Error";

describe("ErrorBoundary Component", () => {
  it("should render children when there is no error", () => {
    const ChildComponent = () => <div>Child Component</div>;
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("should render error message when there is an error", () => {
    const ChildComponent = () => {
      throw new Error("!!! THIS FOR TEST ERROR !!!");
    };

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });
});
