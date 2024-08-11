import "@testing-library/jest-dom/extend-expect";
import { describe, expect, it } from "vitest";
import ErrorBtn from "./ErrorBtn";
import { fireEvent, render } from "@testing-library/react";

describe("ErrorBtn Component", () => {
  it("renders the button", () => {
    const { getByTestId } = render(<ErrorBtn />);

    const button = getByTestId("error-btn");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test error");
  });

  it("throws an error when clicked", () => {
    const { getByTestId } = render(<ErrorBtn />);
    const button = getByTestId("error-btn");

    expect(() => {
      fireEvent.click(button);
    }).toThrow("Something went wrong.");
  });
});
