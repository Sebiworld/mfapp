import { useContext } from "react";
import { AppContextState } from "./appContextReducer";
import { AppContext } from "./AppContext";

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      "useAppContext must be used within a ProjectContextProvider"
    );
  }

  return context;
};
