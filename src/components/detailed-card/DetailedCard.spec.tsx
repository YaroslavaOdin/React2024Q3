import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DetailedCard from "./DetailedCard";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

describe("DetailedCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading", async () => {
    render(<DetailedCard name="Kirk" onClick={() => {}} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display No character data available", async () => {
    const mockResponse = {
      characters: [],
      page: { totalPages: 5 },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as Mock;

    render(<DetailedCard name="Unknown" onClick={() => {}} />);
    await waitFor(() =>
      expect(
        screen.getByText("No character data available."),
      ).toBeInTheDocument(),
    );
  });

  it("should display character details after fetching data", async () => {
    const mockResponse = {
      characters: [
        {
          name: "James T. Kirk",
          uid: "1",
          gender: "Male",
          yearOfBirth: "2233",
          monthOfBirth: "3",
          dayOfBirth: "22",
          placeOfBirth: "Iowa, Earth",
          maritalStatus: "Single",
        },
      ],
      page: { totalPages: 5 },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as Mock;

    render(<DetailedCard name="Kirk" onClick={() => {}} />);

    await waitFor(() =>
      expect(
        screen.getByText("Detailed information about the character"),
      ).toBeInTheDocument(),
    );

    expect(screen.getByText("Name: James T. Kirk")).toBeInTheDocument();
    expect(screen.getByText("Uid: 1")).toBeInTheDocument();
    expect(screen.getByText("Gender: Male")).toBeInTheDocument();
    expect(screen.getByText("Year of birth: 2233")).toBeInTheDocument();
    expect(screen.getByText("Month of birth: 3")).toBeInTheDocument();
    expect(screen.getByText("Day of birth: 22")).toBeInTheDocument();
    expect(screen.getByText("Place of birth: Iowa, Earth")).toBeInTheDocument();
    expect(screen.getByText("Marital status: Single")).toBeInTheDocument();
  });
});
