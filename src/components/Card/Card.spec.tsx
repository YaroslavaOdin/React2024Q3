import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import Card from "./Card";
import { render, screen } from "@testing-library/react";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

const results = {
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

describe("Test Card Component", () => {
  test("renders the Card component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card results={results} />
        </Provider>
        ,
      </BrowserRouter>,
    );
    expect(screen.getByText("Deela")).toBeDefined();
    expect(screen.getByText("Gender: M")).toBeDefined();
  });
});
