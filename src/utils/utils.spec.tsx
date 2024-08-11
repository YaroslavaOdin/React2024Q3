import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import {
  csvmaker,
  getCharacterDetails,
  getCharacters,
  getDetailedInfo,
  getIdFromPath,
} from "./utils";
import { Character } from "./model";

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

describe("getDetailedInfo", () => {
  it("should return given info", () => {
    expect(getDetailedInfo("Test Name")).toBe("Test Name");
    expect(getDetailedInfo(42)).toBe(42);
  });

  it('should return "Not known" if info is empty', () => {
    expect(getDetailedInfo("")).toBe("Not known");
  });
});

describe("csvmaker", () => {
  it("should create CSV from character array", () => {
    const data: Character[] = [
      {
        uid: 1,
        name: "Character 1",
        gender: "Male",
        yearOfBirth: "",
        yearOfDeath: "",
        monthOfBirth: "",
        dayOfBirth: "",
        placeOfBirth: "",
        maritalStatus: "",
      },
      {
        uid: 2,
        name: "Character 2",
        gender: "Female",
        yearOfBirth: "",
        yearOfDeath: "",
        monthOfBirth: "",
        dayOfBirth: "",
        placeOfBirth: "",
        maritalStatus: "",
      },
    ];
    const csvOutput = csvmaker(data);
    expect(csvOutput).toMatch(/uid,name,gender/);
    expect(csvOutput).toMatch(/1,Character 1,Male/);
    expect(csvOutput).toMatch(/2,Character 2,Female/);
  });
});

describe("getCharacters", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return characters and totalPages from the API response", async () => {
    const mockResponse = {
      characters: [{ name: "Kirk" }, { name: "Spock" }],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as Mock;

    const result = await getCharacters(1, "Kirk");

    expect(result).toEqual({
      characters: mockResponse.characters,
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://stapi.co/api/v1/rest/character/search?pageNumber=1&pageSize=50",
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

describe("getCharacterDetails", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return characters and totalPages from the API response", async () => {
    const mockResponse = {
      dataFromServer: {
        characters: [{ name: "Kirk" }],
      },
      dataByIdFromServer: {
        characters: [{ name: "Kirk" }],
      },
    };

    const response = {
      dataFromServer: {
        dataFromServer: { characters: [{ name: "Kirk" }] },
        dataByIdFromServer: { characters: [{ name: "Kirk" }] },
      },
      dataByIdFromServer: {
        dataFromServer: { characters: [{ name: "Kirk" }] },
        dataByIdFromServer: { characters: [{ name: "Kirk" }] },
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as Mock;

    const result = await getCharacterDetails(1, "K", "Kirk");
    expect(result).toEqual(response);

    expect(fetch).toHaveBeenCalledWith(
      "https://stapi.co/api/v1/rest/character/search",
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
