import { SettingsPage } from "@pages/settingsPage/SettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});
