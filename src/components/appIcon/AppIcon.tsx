import { IonIcon } from "@ionic/react";
import { resolveIcon } from "./appIcons";

export interface AppIconProps {
  /** Icon name in kebab-case, e.g. `logo-facebook`. */
  name?: string | null;
}

/** Decorative icon resolved by name; unknown names render the fallback icon. */
export const AppIcon: React.FC<AppIconProps> = ({ name }) => {
  return <IonIcon aria-hidden="true" icon={resolveIcon(name)}></IonIcon>;
};
