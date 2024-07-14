import "@testing-library/jest-dom/extend-expect";
import { beforeEach, describe, expect, it } from "vitest";
import { LocalStorage } from "./local-storage.tsx";

describe("LocalStorage Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set an item in localStorage", () => {
    const { setItem, getItem } = LocalStorage();
    setItem("test-value");

    expect(getItem()).toBe("test-value");
  });

  it("should get an item from localStorage", () => {
    localStorage.setItem("search-value", "test-value");
    const { getItem } = LocalStorage();
    expect(getItem()).toBe("test-value");
  });

  it("should return an empty string if item does not exist in localStorage", () => {
    const { getItem } = LocalStorage();
    expect(getItem()).toBe("");
  });
});
