import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter";

import "@utils/i18n/i18n";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./routing/routes";
import { AppContextProvider } from "./context/appContext/AppContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
