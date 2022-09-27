import { createContext } from "react";
import { usePocketbase } from "../hooks/usePocketbase";

const PocketbaseContext = createContext({ token: "" });

export function PocketbaseContextProvider({ children }) {
  return (
    <PocketbaseContext.Provider value={usePocketbase()}>
      {children}
    </PocketbaseContext.Provider>
  );
}

export default PocketbaseContext;
