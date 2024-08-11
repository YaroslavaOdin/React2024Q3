import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  it("should display Loader Component", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("loader")).toBeTruthy();
  });
});
