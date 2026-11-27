/// <reference types="vite/client" />
declare const __VERSION__: string;
declare const __NAME__: string;
declare const __BUILD_ID__: string;

interface Window {
  /** `performance.now()` when the static splash in `index.html` started; set by its inline script. */
  __mfBootSplashStart?: number;
  /** Timer id of the hint "loading takes long" in the static splash; cleared when the splash is removed. */
  __mfBootSlowTimer?: ReturnType<typeof setTimeout>;
}
