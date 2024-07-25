import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card.tsx";
import { BrowserRouter } from "react-router-dom";

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
      <BrowserRouter>
        <Card results={mockCharacter} />
      </BrowserRouter>,
    );

    expect(getByText(/Deela/i)).toBeInTheDocument();
    expect(getByText(/Gender: M/i)).toBeInTheDocument();
  });
});
