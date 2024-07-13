export const getIdFromPath = (path: string) => {
  const subString = "/star-trek-character/details=";
  return path.replace(subString, "");
};
