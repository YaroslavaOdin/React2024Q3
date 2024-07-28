import { Character } from "./model";

export const getIdFromPath = (path: string) => {
  const subString = "/star-trek-character/details=";
  return path.replace(subString, "");
};

export const getDetailedInfo = (info: string | number): string | number => {
  const noData: string = "Not known";
  return info ? info : noData;
};

const csvmaker = (data: Character[]) => {
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

const download = (data: string) => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8," });
  return URL.createObjectURL(blob);
};

export const createCsvLink = (selectedItems: Character[]) => {
  const csvdata = csvmaker(selectedItems);
  return download(csvdata);
};
