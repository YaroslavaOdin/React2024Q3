import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import store from "../../redux/store";
import CardList from "./CardList";

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
    const { getByTestId } = render(
      <Provider store={store}>
        <CardList result={[mockCharacter]} search={"D"} page={1}></CardList>
      </Provider>,
    );

    expect(getByTestId("cards-list")).toBeTruthy();
  });
});
