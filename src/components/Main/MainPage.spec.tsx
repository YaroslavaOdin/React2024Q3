import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import store from "../../redux/store";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import { BrowserRouter } from "react-router-dom";

const mockCharacter = {
  characters: [
    {
      name: "James T. Kirk",
      uid: 1,
      gender: "Male",
      yearOfBirth: "2233",
      monthOfBirth: "3",
      dayOfBirth: "22",
      placeOfBirth: "Iowa, Earth",
      maritalStatus: "Single",
      yearOfDeath: "",
    },
  ],
  page: {
    pageNumber: 1,
    pageSize: 50,
    numberOfElements: 20,
    totalElements: 50,
    totalPages: 20,
    firstPage: true,
    lastPage: false,
  },
  sort: {
    clauses: [],
  },
};

const emptyDataFromServer = {
  characters: [],
  page: {
    pageNumber: 1,
    pageSize: 50,
    numberOfElements: 20,
    totalElements: 50,
    totalPages: 20,
    firstPage: true,
    lastPage: false,
  },
  sort: {
    clauses: [],
  },
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

describe("MainPage Component", () => {
  it("should display MainPage Component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage
            dataFromServer={mockCharacter}
            dataByIdFromServer={mockCharacter}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("cards-list")).toBeInTheDocument();
    expect(screen.getByTestId("error-btn")).toBeInTheDocument();
  });

  it("displays 'No Results' when there are no characters", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage
            dataFromServer={emptyDataFromServer}
            dataByIdFromServer={emptyDataFromServer}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(/No Results/i)).toBeInTheDocument();
  });
});
