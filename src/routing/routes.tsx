import { App } from "@src/App";
import React from "react";
import { createBrowserRouter } from "react-router";

const Page = React.lazy(() =>
  import("@pages/page/Page").then((module) => ({
    default: module.Page,
  }))
);
const LoginPage = React.lazy(() =>
  import("@pages/loginPage/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const SettingsPage = React.lazy(() =>
  import("@pages/settingsPage/SettingsPage").then((module) => ({
    default: module.SettingsPage,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        index: true,
        Component: Page,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "*",
        Component: Page,
      },
    ],
  },
]);
