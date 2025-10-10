import { LoginPage } from "@pages/loginPage/LoginPage";
import { Page } from "@pages/page/Page";
import { SettingsPage } from "@pages/settingsPage/SettingsPage";
import { App } from "@src/App";
import { createBrowserRouter } from "react-router";

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
      }
    ],
  },
]);
