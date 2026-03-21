import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
  DOMNode,
} from "html-react-parser";
import { Link } from "react-router";

const parserOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.name === "a") {
      const el = domNode as Element;
      const { href, class: className, ...props } = el.attribs;
      const children = domToReact(el.children as DOMNode[]);

      return (
        <Link to={href} className={className} {...props}>
          {children}
        </Link>
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
