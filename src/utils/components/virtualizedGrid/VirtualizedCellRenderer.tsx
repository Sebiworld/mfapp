import {
  CellMeasurer,
  CellMeasurerCache,
  GridCellRenderer,
} from "react-virtualized";

const cache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  fixedHeight: true,
});

export const VirtualizedCellRenderer: GridCellRenderer = ({
  columnIndex,
  key,
  parent,
  rowIndex,
  style,
}) => {
  const content; // Derive this from your data somehow

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={columnIndex}
      key={key}
      parent={parent}
      rowIndex={rowIndex}
    >
      <div
        style={{
          ...style,
          height: 35,
          whiteSpace: "nowrap",
        }}
      >
        {content}
      </div>
    </CellMeasurer>
  );
};
