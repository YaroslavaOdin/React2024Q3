import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("React component: Pagination", () => {
  it('The "onPrevPageClick" handler should be called when the back button is clicked.', () => {
    const onPrevPageClick = vi.fn();

    render(
      <Pagination
        onPrevPageClick={onPrevPageClick}
        onNextPageClick={vi.fn()}
      />,
    );

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(onPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('The "onPrevNextClick" handler should be called when the next button is clicked.', () => {
    const onNextPageClick = vi.fn();

    render(
      <Pagination
        onPrevPageClick={vi.fn()}
        onNextPageClick={onNextPageClick}
      />,
    );

    const prevButton = screen.getByText(">");
    fireEvent.click(prevButton);

    expect(onNextPageClick).toHaveBeenCalledTimes(1);
  });

  it("The current page and the total number of pages should be displayed", () => {
    const pagesInfo = {
      current: 0,
      total: 50,
    };

    const { getByText } = render(
      <Pagination
        nav={pagesInfo}
        onPrevPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
      />,
    );

    expect(getByText("1 / 50")).toBeInTheDocument();
  });
});
