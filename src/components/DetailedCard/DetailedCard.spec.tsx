import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DetailedCard from "./DetailedCard";
import { describe, expect, it, vi } from "vitest";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("DetailedCard", () => {
  it("should display no details message when there are no characters", async () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DetailedCard name="Character 1" onClick={() => handleClick} />
        </Provider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(
        screen.getByText("No character data available."),
      ).toBeInTheDocument();
    });
  });

  it("should display character details when data is available", async () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DetailedCard name="James T. Kirk" onClick={() => handleClick} />
        </Provider>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Detailed information about the character/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Name: James T. Kirk/i)).toBeInTheDocument();
      expect(screen.getByText(/Uid: CHMA0000147243/i)).toBeInTheDocument();
      expect(screen.getByText(/Gender: M/i)).toBeInTheDocument();
      expect(screen.getByText(/Year of birth: 2233/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Month of birth: Not known/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Day of birth: Not known/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Place of birth: Not known/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Marital status: WIDOWED/i)).toBeInTheDocument();
    });
  });
});
