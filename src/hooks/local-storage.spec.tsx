import "@testing-library/jest-dom/extend-expect";
import { beforeEach, describe, expect, it } from "vitest";
import useLocalStorage from "./local-storage.tsx";
import { act, renderHook } from "@testing-library/react";

describe("useLocalStorage", () => {
  const key = "testKey";
  const defaultValue = "defaultValue";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the default value when there is no stored value", () => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    expect(result.current[0]).toBe(defaultValue);
  });

  it("should return the stored value when there is one", () => {
    localStorage.setItem(key, JSON.stringify("storedValue"));

    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    expect(result.current[0]).toBe("storedValue");
  });

  it("should update localStorage when the value is changed", () => {
    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorage.getItem(key)).toBe(JSON.stringify("newValue"));
  });

  it("should handle JSON parsing errors gracefully", () => {
    localStorage.setItem(key, "invalidJSON");

    const { result } = renderHook(() => useLocalStorage(key, defaultValue));

    expect(result.current[0]).toBe(defaultValue);
  });
});
