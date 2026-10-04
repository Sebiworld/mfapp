import { createContext, useContext, useLayoutEffect } from "react";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { DefaultPageDto } from "@models/page/default-page-dto.model";

interface TranslucentHeaderContextValue {
  /** True while the shown page starts with a hero. */
  isTranslucent: boolean;
  setTranslucent: (isTranslucent: boolean) => void;
}

/**
 * Whether the header lies translucent over the content. The page that is shown sets it, not the page in the
 * store: a page can be stored before it is shown, and the header must not change before its content.
 */
export const TranslucentHeaderContext =
  createContext<TranslucentHeaderContextValue>({
    isTranslucent: false,
    setTranslucent: () => undefined,
  });

/**
 * Tells whether the header lies translucent over the content of the shown page.
 * @returns True if the shown page starts with a hero section.
 */
export const useTranslucentHeader = (): boolean =>
  useContext(TranslucentHeaderContext).isTranslucent;

/**
 * Lets the header lie translucent over a shown page that starts with a hero: only such a page has content meant
 * to sit below the header. Set before the first paint of the page, and reset when the page goes.
 * @param page The page that is shown, or none while nothing is shown.
 */
export const useShowPageBelowHeader = (page?: PageDtoVariant): void => {
  const { setTranslucent } = useContext(TranslucentHeaderContext);
  const startsWithHero =
    (page as DefaultPageDto | undefined)?.sections?.[0]?.type === "hero";

  useLayoutEffect(() => {
    setTranslucent(startsWithHero);
  }, [setTranslucent, startsWithHero]);

  useLayoutEffect(() => {
    return () => {
      setTranslucent(false);
    };
  }, [setTranslucent]);
};
