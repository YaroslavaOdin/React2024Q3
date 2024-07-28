import { describe, expect, it } from "vitest";
import NotFoundPage from "./NotFoundPage";
import { render, screen } from "@testing-library/react";

describe("NotFoundPage Component", () => {
  it("sould render NotFoundPage", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404 Not Found")).toBeDefined();
  });
});
