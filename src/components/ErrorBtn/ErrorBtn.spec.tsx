import { describe, expect, it } from "vitest";
import ErrorBtn from "./ErrorBtn";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

describe("ErrorBtn Component", () => {
  it("should render the button", () => {
    render(<ErrorBtn />);
    expect(screen.getByText("Test error")).toBeDefined();
  });

  it("should throw an error when the button is clicked", () => {
    render(
      <ErrorBoundary>
        <ErrorBtn />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByText("Test error"));
  });
});
