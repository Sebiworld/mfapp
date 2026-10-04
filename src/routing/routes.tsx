import { App } from "@src/App";
import { ErrorPage } from "@core/errorPage/ErrorPage";
import React from "react";
import { createBrowserRouter, RouteObject } from "react-router";
import { CatchAllPage } from "./CatchAllPage";

const SettingsPage = React.lazy(() =>
  import("@pages/settingsPage/SettingsPage").then((module) => ({
    default: module.SettingsPage,
  }))
);
const SecretCodePage = React.lazy(() =>
  import("@pages/games/secretCodePage/SecretCodePage").then((module) => ({
    default: module.SecretCodePage,
  }))
);

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,

    children: [
      {
        index: true,
        Component: CatchAllPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "secret-code",
        Component: SecretCodePage,
      },
      {
        path: "*",
        Component: CatchAllPage,
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);
