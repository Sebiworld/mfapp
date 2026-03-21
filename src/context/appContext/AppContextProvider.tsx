import { useReducer, PropsWithChildren, ReactNode } from "react";
import { AppContextInitialState, appContextReducer } from "./appContextReducer";
import { AppDispatchContext } from "./AppDispatchContext";
import { AppContext } from "./AppContext";

export const AppContextProvider = (
  props: PropsWithChildren<{ children?: ReactNode }>
) => {
  const [state, dispatch] = useReducer(
    appContextReducer,
    AppContextInitialState
  );

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
    </AppDispatchContext.Provider>
  );
};
