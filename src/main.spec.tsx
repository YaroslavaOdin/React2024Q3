import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

describe("Render app", () => {
  it("should renders Main within ErrorBoundary", () => {
    const { getByTestId } = render(<RouterProvider router={router} />);
    expect(getByTestId("main")).toBeTruthy();
  });
});
