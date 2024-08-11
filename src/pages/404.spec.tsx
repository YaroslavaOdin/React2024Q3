import "@testing-library/jest-dom/extend-expect";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import NotFoundPage from "./404";

describe("NotFoundPage Component", () => {
  it("renders NotFoundPage Component", () => {
    const { getByTestId } = render(<NotFoundPage />);
    expect(getByTestId("not-found-page")).toBeTruthy();
  });
});
