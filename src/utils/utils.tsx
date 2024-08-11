import { Character, IResponse } from "./model";

export const getIdFromPath = (path: string) => {
  const subString = "/star-trek-character/details=";
  return path.replace(subString, "");
};

export const getDetailedInfo = (info: string | number): string | number => {
  const noData: string = "Not known";
  return info ? info : noData;
};

export const csvmaker = (data: Character[]) => {
  const keys = Object.keys(data[0]);
  const values = [];
  values.push(keys);
  data.forEach((item: Character) => {
    values.push(Object.values(item));
  });
  let result = "";
  values.forEach((row) => {
    result += `${row.join(",")}\n`;
  });
  return result;
};

export const download = (data: string) => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8," });
  return URL.createObjectURL(blob);
};

export const createCsvLink = (selectedItems: Character[]) => {
  const csvdata = csvmaker(selectedItems);
  return download(csvdata);
};

export const getCharacterDetails = async (
  page = 0,
  search = "",
  name: unknown,
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${search}`,
  };
  let dataFromServerResult, dataFromServer;
  if (search) {
    dataFromServerResult = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page || 0}&pageSize=50`,
      requestOptions,
    );
    dataFromServer = await dataFromServerResult.json();
  } else {
    dataFromServerResult = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page || 0}&pageSize=50`,
    );
    dataFromServer = await dataFromServerResult.json();
  }

  const requestOptionsForCharacter = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${name}`,
  };

  const dataByIdFromServerResult = await fetch(
    `https://stapi.co/api/v1/rest/character/search`,
    requestOptionsForCharacter,
  );
  const dataByIdFromServer: IResponse = await dataByIdFromServerResult.json();

  return { dataFromServer, dataByIdFromServer };
};

export const getCharacters = async (page: number, search = "") => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${search}`,
  };
  let result, dataFromServer;
  if (search) {
    const result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=50`,
      requestOptions,
    );
    dataFromServer = await result.json();
  } else {
    result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=50`,
    );
    dataFromServer = await result.json();
  }
  return dataFromServer;
};
