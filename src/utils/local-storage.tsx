export function LocalStorage() {
  const setItem = (value: string) => {
    localStorage.setItem("search-value", value);
  };

  const getItem = () => {
    return localStorage.getItem("search-value") || "";
  };

  return { getItem, setItem };
}
