import type { Organization } from "schema-dts";

export const publisherLdJson: Organization = {
  "@type": "Organization",
  name: "Musical-Fabrik",
  legalName: "Musical-Fabrik e. V.",
  url: "https://www.musical-fabrik.de",
  logo: {
    "@type": "ImageObject",
    url: "https://www.musical-fabrik.de/assets/img/logo_optimized.jpg",
    width: "254",
    height: "60",
  },
};

export const publisherLongLdJson: Organization = {
  "@type": "Organization",
  name: "Musical-Fabrik",
  legalName: "Musical-Fabrik e. V.",
  url: "https://www.musical-fabrik.de",
  logo: {
    "@type": "ImageObject",
    url: "https://www.musical-fabrik.de/assets/img/logo.jpg",
    width: "2000",
    height: "667",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bosfelder Weg 81",
    addressLocality: "Rheda-Wiedenbrück",
    addressRegion: "Nordrhein-Westfalen",
    postalCode: "33378",
    addressCountry: "DE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+49-5242-402430",
      email: "info@musical-fabrik.de",
      faxNumber: "+0049-5242-402432",
    },
  ],
  foundingDate: "2012",
  founders: [
    {
      "@type": "Person",
      name: "Klaus Wulfheide",
    },
  ],
  sameAs: [
    "https://www.instagram.com/musicalfabrik/",
    "https://de-de.facebook.com/musicalfabrik",
    "https://twitter.com/MusicalFabrik",
    "https://www.youtube.com/channel/UCluu4BuDfn4dChkFBPpQt0g",
  ],
};
