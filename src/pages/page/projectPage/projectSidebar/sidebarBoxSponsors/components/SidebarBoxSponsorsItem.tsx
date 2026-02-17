import { parseHtml } from "@utils/functions/parseHtml";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { useMemo } from "react";

export interface SidebarBoxSponsorsItemProps {
  index: number;
  total: number;
  item: NavigationItemDto;
}

export const SidebarBoxSponsorsItem: React.FC<SidebarBoxSponsorsItemProps> = ({
  item,
  index,
  total,
}) => {
  const title = useMemo(() => {
    if (!item.title && !item?.page?.title) {
      return null;
    }

    return parseHtml(item.title || item?.page?.title);
  }, [item.title, item?.page?.title]);

  return (
    <>
      <span key={item.id}>{title}</span>
      {index + 1 < total && <span className="separator">, </span>}
    </>
  );
};
