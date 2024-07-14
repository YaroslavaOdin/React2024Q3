import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Main from "./components/main/Main";

describe("Render app", () => {
  it("should renders Main within ErrorBoundary", () => {
    const { getByTestId } = render(<Main />);
    expect(getByTestId("main")).toBeTruthy();
  });
});
