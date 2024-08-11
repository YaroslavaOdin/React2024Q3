import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination.tsx";

describe("React component: Pagination", () => {
  it("The current page and the total number of pages should be displayed", () => {
    const { getByText } = render(
      <Pagination
        onPrevPageClick={vi.fn()}
        onNextPageClick={vi.fn()}
        search={""}
        pageData={{
          page: 0,
          totalPages: 2,
        }}
      />,
    );

    expect(getByText("0 / [2]")).toBeInTheDocument();
  });
});
