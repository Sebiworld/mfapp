import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
  DOMNode,
} from "html-react-parser";
import { Link } from "react-router";

const SCHEME_PATTERN = /^([a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Resolves a link target to an in-app path.
 * @param href Link target from the HTML.
 * @returns Path for the router when the link stays in the app (relative or same host), otherwise `null`.
 */
const getInternalPath = (href: string): string | null => {
  if (!SCHEME_PATTERN.test(href)) {
    return href;
  }

  try {
    const url = new URL(href, window.location.origin);

    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.host === window.location.host
    ) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    // Unparsable targets stay plain links.
  }

  return null;
};

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.name === "a") {
      const el = domNode as Element;
      const { href, class: className, ...props } = el.attribs;
      const children = domToReact(el.children as DOMNode[]);

      if (!href) {
        return (
          <a className={className} {...props}>
            {children}
          </a>
        );
      }

      const internalPath = getInternalPath(href);

      if (internalPath !== null) {
        return (
          <Link to={internalPath} className={className} {...props}>
            {children}
          </Link>
        );
      }

      // Only web links open a new tab; mailto: and tel: stay in place.
      const opensNewTab = /^https?:|^\/\//i.test(href);

      return (
        <a
          href={href}
          className={className}
          {...props}
          {...(opensNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
  },
};

export const parseHtml = (htmlString: string | undefined): React.ReactNode => {
  if (!htmlString || typeof htmlString !== "string") {
    return null;
  }

  // Use html-react-parser to safely parse the HTML string into React nodes
  return parse(htmlString, parserOptions);
};
