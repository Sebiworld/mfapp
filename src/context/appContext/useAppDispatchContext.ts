import { useContext } from "react";
import { AppContextAction } from "./appContextReducer";
import { AppDispatchContext } from "./AppDispatchContext";

export const useAppDispatchContext = (): React.Dispatch<AppContextAction> => {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useAppDispatchContext must be used within a AppContextProvider"
    );
  }

  return context!;
};
