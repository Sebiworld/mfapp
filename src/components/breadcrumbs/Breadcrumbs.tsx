import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";
import {
  Box,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { breadcrumbsStyles } from "./breadcrumbs.styles";
import { isValidArray } from "@utils/functions/isValidArray";
import { BreadcrumbList, WithContext } from "schema-dts";

export interface BreadcrumbsProps {
  items?: BreadcrumbDto[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const structuredData = useMemo(() => {
    if (!isValidArray(items) || !items.length) {
      return;
    }

    const output: WithContext<BreadcrumbList> = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        "@id": `${item.id}`,
        name: item.title,
        item: item.httpUrl,
      })),
    };

    return output;
  }, [items]);

  return (
    <>
      <Box className="breadcrumbs" sx={breadcrumbsStyles}>
        <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
          {items?.map((item) => {
            if (item.url && !item.active && item.viewable) {
              return (
                <Link key={item.id} href={item.url}>
                  {item.title}
                </Link>
              );
            }

            return <Typography key={item.id}>{item.title}</Typography>;
          })}
        </MuiBreadcrumbs>
      </Box>

      {!!structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
};
