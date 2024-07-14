import { describe, it, expect, Mock, vi, beforeEach } from "vitest";
import { getIdFromPath, getSearchData } from "./utils";

describe("getIdFromPath", () => {
  it("should extract the ID from the path", () => {
    const path = "/star-trek-character/details=12345";
    const result = getIdFromPath(path);
    expect(result).toBe("12345");
  });

  it("should return the original path if the substring is not found", () => {
    const path = "/some-other-path/details=12345";
    const result = getIdFromPath(path);
    expect(result).toBe("/some-other-path/details=12345");
  });

  it("should return an empty string if the path is exactly the substring", () => {
    const path = "/star-trek-character/details=";
    const result = getIdFromPath(path);
    expect(result).toBe("");
  });
});

describe("getSearchData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return characters and totalPages from the API response", async () => {
    const mockResponse = {
      characters: [{ name: "Kirk" }, { name: "Spock" }],
      page: { totalPages: 5 },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as Mock;

    const result = await getSearchData("Kirk", 1);

    expect(result).toEqual({
      characters: mockResponse.characters,
      totalPages: mockResponse.page.totalPages,
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://stapi.co/api/v1/rest/character/search?pageNumber=1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: "name=Kirk",
      },
    );
  });
});
