import { describe, it, expect, vi } from "vitest";
import { createCsvLink, csvmaker, download, getDetailedInfo, getIdFromPath } from "./utils";
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

  describe('download', () => {
    global.URL.createObjectURL = vi.fn();
    it('should create a blob URL from CSV data', () => {
        global.URL.createObjectURL = vi.fn(() => 'details');
        const data = 'name,age\nJohn,30\nDoe,25';
        const blobUrl = download(data);
        expect(blobUrl).toMatch('details');
    });
  });

  describe('createCsvLink', () => {
    global.URL.createObjectURL = vi.fn();
    it('should create a CSV link from selected characters', () => {
      global.URL.createObjectURL = vi.fn(() => 'details');
        const selectedItems: Character[] = [
            { name: "Kirk",
              uid: 1,
              gender: "Male",
              yearOfBirth: "2233",
              monthOfBirth: "3",
              dayOfBirth: "22",
              placeOfBirth: "Earth",
              maritalStatus: "Single",
              yearOfDeath: "2267", 
            }
        ];

        const csvLink = createCsvLink(selectedItems);
        expect(csvLink).toMatch('details');
    });
});
});
