import { describe, it, expect } from "vitest";
import { csvmaker, getDetailedInfo, getIdFromPath } from "./utils";
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
