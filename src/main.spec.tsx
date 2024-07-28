import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { render } from "@testing-library/react";

describe("Render app", () => {
  it("should renders Main within ErrorBoundary", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(getByTestId("main")).toBeTruthy();
  });
});
