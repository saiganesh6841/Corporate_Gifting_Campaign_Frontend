import { createTableColumn } from "@fluentui/react-components";
import React, { useEffect, useMemo, useState } from "react";

const useTable = (columns, setColumns, viewColumn) => {
  const columnSize = {};
  //
  useMemo(() => {
    columns?.forEach((value) => {
      columnSize[value?.columnId] = {
        minWidth: value?.minWidth,
      };
    });
  }, []);

  const [columnSizingOptions, setColumnSizingOptions] = useState(columnSize);

  useEffect(() => {
    // which all column viewable and whenver the viewable column changes
    const visibleColumnIds = viewColumn
      ?.filter((value) => value?.visibility)
      ?.map((value) => value?.columnId);
    // checks whether the column passed is viewable or not
    const updatedColumns = columns?.filter((value) =>
      visibleColumnIds?.includes(value?.columnId)
    );

    setColumns(convertColumn(updatedColumns));
  }, [viewColumn]);

  const convertColumn = (items) => {
    // this function converts the array values column  to readable column by the table
    return items?.map((value) => {
      let id = value?.columnId;

      return createTableColumn({
        columnId: id,
        renderHeaderCell: () => (
          <div style={{ textTransform: "capitalize", fontWeight: 600 }}>
            {value?.fieldName}
          </div>
        ),
        compare: (a, b) => {
          // return a?.[id]?.localeCompare(b?.[id]);

          const aValue =
            typeof a[id] === "string" || typeof a[id] === "number" ? a[id] : "";
          const bValue =
            typeof b[id] === "string" || typeof b[id] === "number" ? b[id] : "";

          // Convert to string for localeCompare, and handle numeric comparison if needed
          const aStr = String(aValue);
          const bStr = String(bValue);

          return aStr?.localeCompare(bStr, undefined, { numeric: true });
        },
        renderCell: value?.renderCell,
      });
    });
  };

  return { convertColumn, columnSizingOptions };
};

export default useTable;
