import { Fade } from "@mui/material";
import { cloneElement, ReactElement, Ref, useState } from "react";

/** Phase the dialog is in; `MuiModal.ts` scales `.modal-container` by it. */
type ModalMotion = "enter" | "exit";

interface ModalMotionChildProps {
  "data-motion"?: ModalMotion;
}

export interface ModalTransitionProps {
  in?: boolean;
  appear?: boolean;
  onEnter?: () => void;
  onExited?: () => void;
  children: ReactElement<ModalMotionChildProps>;
  // Set by the modal's focus trap; the fade hands it to the dialog.
  ref?: Ref<unknown>;
}

const MODAL_TIMEOUT = { enter: 200, exit: 150 };

/**
 * Fades the dialog of a MUI `Modal` in and out and marks the phase as `data-motion` on it, so the theme can scale it
 * along. The modal recognises it as its transition by the `in` prop and passes `onEnter`/`onExited` in; with
 * `closeAfterTransition` it stays mounted until the exit has finished. Everything else the modal and its focus trap
 * set (`ref`, `tabIndex`, `onFocus`) goes on to the dialog, otherwise focus would not move into it and Escape would
 * not close it.
 * @param props.in Whether the dialog is shown.
 * @param props.appear Whether it fades in on mount (default `true`).
 * @param props.onEnter Called when the dialog starts to enter.
 * @param props.onExited Called once the dialog has faded out.
 * @param props.children The dialog element; it must hold a ref.
 * @returns The dialog inside a fade.
 */
export const ModalTransition = ({
  in: isIn,
  appear = true,
  onEnter,
  onExited,
  children,
  ...forwarded
}: ModalTransitionProps): ReactElement => {
  const [motion, setMotion] = useState<ModalMotion>("enter");

  return (
    <Fade
      {...forwarded}
      in={isIn}
      appear={appear}
      timeout={MODAL_TIMEOUT}
      onEnter={() => {
        setMotion("enter");
        onEnter?.();
      }}
      onExit={() => {
        setMotion("exit");
      }}
      onExited={() => {
        onExited?.();
      }}
    >
      {cloneElement(children, { "data-motion": motion })}
    </Fade>
  );
};
