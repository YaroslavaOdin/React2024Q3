import { Character, Result } from "./model";

export const URL = "https://stapi.co/api/v1/rest/character/search";

export const getIdFromPath = (path: string) => {
  const subString = "/star-trek-character/details=";
  return path.replace(subString, "");
};

export const getSearchData = async (
  searchQuery: string,
  pageNumber: number,
): Promise<Result> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${searchQuery}`,
  };

  return await fetch(`${URL}?pageNumber=${pageNumber}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return {
        characters: result.characters,
        totalPages: result.page.totalPages,
      };
    });
};

export const getCharacterInfo = async (name: string): Promise<Character[]> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${decodeURI(name)}`,
  };

  return await fetch(`${URL}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.characters;
    });
};

export const getDetailedInfo = (info: string | number): string | number => {
  const noData: string = "Not known";
  return info ? info : noData;
};
