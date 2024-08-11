import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import DetailedCard from "./DetailedCard";
import { describe, expect, it } from "vitest";

const mockCharacter = {
  name: "James T. Kirk",
  uid: 1,
  gender: "Male",
  yearOfBirth: "2233",
  monthOfBirth: "3",
  dayOfBirth: "22",
  placeOfBirth: "Iowa, Earth",
  maritalStatus: "Single",
  yearOfDeath: "",
};

const mockEmptyCharacter = {
  name: "",
  uid: 0,
  gender: "",
  yearOfBirth: "",
  monthOfBirth: "",
  dayOfBirth: "",
  placeOfBirth: "",
  maritalStatus: "",
  yearOfDeath: "",
};

describe("DetailedCard Component", () => {
  it("should display character details", async () => {
    render(<DetailedCard character={mockCharacter} onClick={() => {}} />);
    expect(
      screen.getByText("Detailed information about the character"),
    ).toBeInTheDocument(),
      expect(screen.getByText("Name: James T. Kirk")).toBeInTheDocument();
    expect(screen.getByText("Uid: 1")).toBeInTheDocument();
    expect(screen.getByText("Gender: Male")).toBeInTheDocument();
    expect(screen.getByText("Year of birth: 2233")).toBeInTheDocument();
    expect(screen.getByText("Month of birth: 3")).toBeInTheDocument();
    expect(screen.getByText("Day of birth: 22")).toBeInTheDocument();
    expect(screen.getByText("Place of birth: Iowa, Earth")).toBeInTheDocument();
    expect(screen.getByText("Marital status: Single")).toBeInTheDocument();
  });

  it("should display character details", async () => {
    render(<DetailedCard character={mockEmptyCharacter} onClick={() => {}} />);
    expect(screen.getByText("No character data available.")).toBeInTheDocument();
  });

  it("should display character details", async () => {
    render(<DetailedCard character={mockEmptyCharacter} onClick={() => {}} />);
    expect(screen.getByText("No character data available.")).toBeInTheDocument();
  });
});
