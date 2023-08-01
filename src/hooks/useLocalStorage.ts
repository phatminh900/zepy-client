import { useEffect, useState } from "react";

const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data || data === "null") return null;
  return JSON.parse(data);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLocalStorage = (key: string, defaultValue?: any) => {
  const [value, setValue] = useState(
    // There is item in the local storage use it otherwise use the default value
    function () {
      return getItem(key);
    } || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};
export default useLocalStorage;
