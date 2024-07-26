export const getIdFromPath = (path: string) => {
  const subString = "/star-trek-character/details=";
  return path.replace(subString, "");
};

export const getDetailedInfo = (info: string | number): string | number => {
  const noData: string = "Not known";
  return info ? info : noData;
};
