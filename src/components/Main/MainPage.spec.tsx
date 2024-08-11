import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import store from "../../redux/store";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import createRouter from "next-router-mock";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

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

describe("MainPage Component", () => {
  const router = createRouter;

  it("should display MainPage Component", () => {
    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            dataFromServer={mockCharacter}
            dataByIdFromServer={mockCharacter}
          />
        </Provider>
      </RouterContext.Provider>,
    );

    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("cards-list")).toBeInTheDocument();
    expect(screen.getByTestId("error-btn")).toBeInTheDocument();
  });

  it("displays 'No Results' when there are no characters", () => {
    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            dataFromServer={emptyDataFromServer}
            dataByIdFromServer={emptyDataFromServer}
          />
        </Provider>
      </RouterContext.Provider>,
    );
    expect(screen.getByText(/No Results/i)).toBeInTheDocument();
  });

  it("handles pagination next and previous button clicks", () => {
    render(
        <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            dataFromServer={mockCharacter}
            dataByIdFromServer={mockCharacter}
          />
        </Provider>
      </RouterContext.Provider>,
    );

    const nextButton = screen.getByRole('button', { name: />/i });
    const prevButton = screen.getByRole('button', { name: /</i });

    const navigateSpy = vi.spyOn(router, 'replace');
    fireEvent.click(nextButton);
    expect(navigateSpy).toHaveBeenCalledWith('/?search=&page=0');

    fireEvent.click(prevButton);
    expect(navigateSpy).toHaveBeenCalledWith('/?search=&page=0');

    fireEvent.click(prevButton);
    expect(navigateSpy).not.toHaveBeenCalledWith('/?search=&page=-1');
  });

  it("has detailedCard", () => {
    render(
        <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            dataFromServer={mockCharacter}
            dataByIdFromServer={mockCharacter}
          />
        </Provider>
      </RouterContext.Provider>,
    );

    const detailedCard = screen.getByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument();
  });

  it("runs search and updates local storage", () => {
    render(
        <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            dataFromServer={mockCharacter}
            dataByIdFromServer={mockCharacter}
          />
        </Provider>
      </RouterContext.Provider>,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Spock" } });
    const navigateSpy = vi.spyOn(router, 'replace');
    const nextButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(nextButton);
    expect(navigateSpy).toHaveBeenCalledWith('/?search=Spock&page=0');
  });
});
