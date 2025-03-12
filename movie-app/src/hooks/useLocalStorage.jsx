import { useEffect, useState } from "react";

export default function useLocalStorage(initalData, key) {
  const [value, setValue] = useState(function () {
    const obj = localStorage.getItem(key);
    return obj ? JSON.parse(obj) : initalData;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
