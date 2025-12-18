import React, { createContext } from "react";
import { AppContextAction } from "./appContextReducer";

export const AppDispatchContext =
  createContext<React.Dispatch<AppContextAction> | null>(() => {});
