import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data));
  }, []);

  return <ApiContext.Provider value={{data, setData}}>{children}</ApiContext.Provider>;
};
