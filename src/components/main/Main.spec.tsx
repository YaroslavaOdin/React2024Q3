import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";

vi.mock("./Main", () => ({
  __esModule: true,
  default: () => <div>Search Page</div>,
}));

describe("Main Component", () => {
  it("render Main page", () => {
    render(
      <MemoryRouter initialEntries={["/search/page1"]}>
        <Routes>
          <Route path="/search/:pagenumber" element={<Main />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Search Page")).toBeInTheDocument();
  });
});
