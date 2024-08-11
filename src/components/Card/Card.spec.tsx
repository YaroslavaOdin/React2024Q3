import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Card from "./Card";
import { Provider } from "react-redux";
import store from "../../redux/store";

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
  it("should render character name and gender", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Card results={mockCharacter} search={"D"} page={1} />
        </BrowserRouter>
      </Provider>,
    );

    expect(getByText(/Deela/i)).toBeInTheDocument();
  });
});
