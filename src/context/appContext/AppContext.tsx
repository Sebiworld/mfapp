import { createContext } from "react";
import { AppContextInitialState, AppContextState } from "./appContextReducer";

export const AppContext = createContext<AppContextState>(
  AppContextInitialState
);
