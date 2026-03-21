import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";
import { Link, Typography } from "@mui/material";
import { parseHtml } from "@utils/functions/parseHtml";
import { FC, useMemo } from "react";
import { NavLink } from "react-router";

export interface BreadcrumbItemProps {
  item?: BreadcrumbDto;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ item }) => {
  const title = useMemo(() => {
    if (!item?.title) {
      return null;
    }

    return parseHtml(item.title);
  }, [item]);

  if (!item?.id) {
    return null;
  }

  if (!item.url || item.active || !item.viewable) {
    return <Typography>{title}</Typography>;
  }

  return (
    <Link component={NavLink} to={{ pathname: item.url }}>
      {title}
    </Link>
  );
};
