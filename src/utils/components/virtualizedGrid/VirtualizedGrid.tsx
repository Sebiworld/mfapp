import { Box } from "@mui/material";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { FC, ReactNode, useEffect, useRef } from "react";
import {
  AutoSizerProps,
  Grid as _Grid,
  GridCellProps,
  GridProps,
  WindowScroller as _WindowScroller,
  AutoSizer as _AutoSizer,
  WindowScrollerProps,
} from "react-virtualized";
import { virtualizedGridStyles } from "./virtualizedGrid.styles";

export interface VirtualizedGridItemProps<ItemType> extends GridCellProps {
  items: ItemType[];
  columnCount: number;
}

const Grid = _Grid as unknown as FC<GridProps>;
const WindowScroller = _WindowScroller as unknown as FC<WindowScrollerProps>;
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;

/**
 * Interfaces
 */

interface VirtualizedGridProps<ItemType> {
  items: ItemType[];
  itemHeight: number;
  itemMinWidth: number;
  renderItem: (props: VirtualizedGridItemProps<ItemType>) => ReactNode;
  numColumns?: number; // explicitly set number of columns
}

export function VirtualizedGrid<ItemType>({
  items,
  renderItem,
  itemHeight,
  itemMinWidth,
  numColumns,
}: VirtualizedGridProps<ItemType>): ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const containerWidth = containerRef?.current?.clientWidth;

  const windowSize = useWindowSize();

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  const calculateColumnCount = (width: number) => {
    return Math.floor(width / itemMinWidth);
  };

  const calculateItemWidth = (width: number, columnCount: number) => {
    return width / columnCount;
  };

  return (
    <Box sx={virtualizedGridStyles} ref={containerRef}>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {() => {
              const columnCount =
                numColumns ?? calculateColumnCount(containerWidth);
              const rowCount = Math.ceil(items.length / columnCount);
              const itemWidth = calculateItemWidth(containerWidth, columnCount);

              return (
                <Grid
                  ref={gridRef}
                  autoHeight
                  columnCount={columnCount}
                  columnWidth={itemWidth}
                  width={containerWidth}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={itemHeight}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  onScroll={onChildScroll}
                  cellRenderer={(props: GridCellProps) => {
                    const fullProps: VirtualizedGridItemProps<ItemType> = {
                      ...props,
                      items,
                      columnCount: columnCount,
                    };

                    return renderItem(fullProps);
                  }}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </Box>
  );
}
