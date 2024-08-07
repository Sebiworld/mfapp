import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        navigation?: string | boolean;
        pagination?: string | boolean;
        init?: string | boolean;
        // Add more properties
      };
      'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        lazy?: string;
        // Add more properties
      };
    }
  }
}