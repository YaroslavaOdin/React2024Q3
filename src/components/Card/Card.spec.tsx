import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Card from "./Card";
import { Provider } from "react-redux";
import store from "../../redux/store";
import createRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { fireEvent, screen } from "@testing-library/react";

const mockCharacter = {
  uid: 1,
  name: "Deela",
  gender: "M",
  yearOfBirth: "",
  yearOfDeath: "",
  monthOfBirth: "",
  dayOfBirth: "",
  placeOfBirth: "",
  maritalStatus: "",
};

describe("Card Component", () => {
  const router = createRouter;
  it("should render character name and gender", () => {

    const { getByText } = render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <BrowserRouter>
            <Card results={mockCharacter} search={"D"} />
          </BrowserRouter>
        </Provider>
      </RouterContext.Provider>,
    );

    expect(getByText(/Deela/i)).toBeInTheDocument();
  });

  it("should select card", () => {
    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <BrowserRouter>
            <Card results={mockCharacter} search={"D"} />
          </BrowserRouter>
        </Provider>
      </RouterContext.Provider>,
    );

    const selectBtn = screen.getByTestId("select-card-btn");
    fireEvent.click(selectBtn);
    expect(screen.getByTestId("unselect-card-btn")).toBeInTheDocument();
  });
});
