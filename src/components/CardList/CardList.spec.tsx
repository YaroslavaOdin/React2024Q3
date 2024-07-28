import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Character } from "../../utils/model";
import CardList from "./CardList";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";

describe("CardList Component", () => {
  const mockCharacters: Character[] = [
    {
      uid: 1,
      name: "Kim",
      gender: "M",
      yearOfBirth: "",
      yearOfDeath: "",
      monthOfBirth: "",
      dayOfBirth: "",
      placeOfBirth: "",
      maritalStatus: "",
    },
    {
      uid: 2,
      name: "Deela",
      gender: "M",
      yearOfBirth: "",
      yearOfDeath: "",
      monthOfBirth: "",
      dayOfBirth: "",
      placeOfBirth: "",
      maritalStatus: "",
    },
  ];

  it("should render a list of cards", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList result={mockCharacters} />
        </Provider>
      </BrowserRouter>,
    );

    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(mockCharacters.length);
  });

  it("should render no cards when result is empty", () => {
    render(<CardList result={[]} />);

    const cards = screen.queryAllByTestId("card");
    expect(cards.length).toBe(0);
  });
});
