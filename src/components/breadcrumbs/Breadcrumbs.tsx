import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";
import { Box, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { FC, useMemo } from "react";
import { breadcrumbsStyles } from "./breadcrumbs.styles";
import { isValidArray } from "@utils/functions/isValidArray";
import { BreadcrumbList, ListItem, WithContext } from "schema-dts";
import { BreadcrumbItem } from "./BreadcrumbItem";

export interface BreadcrumbsProps {
  items?: BreadcrumbDto[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const structuredData = useMemo(() => {
    if (!isValidArray(items) || !items.length) {
      return;
    }

    const listItems = items
      .map((item, index) => {
        if (!item.httpUrl || !item.viewable) {
          return null;
        }

        const itemOutput: ListItem = {
          "@type": "ListItem",
          position: index + 1,
          "@id": `${item.id}`,
          name: item.title,
          item: item.httpUrl,
        };

        return itemOutput;
      })
      .filter((item) => !!item);

    if (!isValidArray(listItems) || !listItems.length) {
      return;
    }

    const output: WithContext<BreadcrumbList> = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: listItems,
    };

    return output;
  }, [items]);

  return (
    <>
      <Box className="breadcrumbs" sx={breadcrumbsStyles}>
        <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
          {items?.map((item) => (
            <BreadcrumbItem key={item.id} item={item} />
          ))}
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
