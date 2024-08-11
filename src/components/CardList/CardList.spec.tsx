import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import store from "../../redux/store";
import CardList from "./CardList";
import createRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

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

describe("CardList Component", () => {
  it("should render CardList Component", () => {
    const router = createRouter;
    const { getByTestId } = render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <CardList result={[mockCharacter]} search={"D"}></CardList>
        </Provider>
      </RouterContext.Provider>,
    );

    expect(getByTestId("cards-list")).toBeTruthy();
  });
});
