import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableColumnSizing_unstable,
  useTableFeatures,
  TableSelectionCell,
  useTableSelection,
  useTableSort,
} from "@fluentui/react-components";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@fluentui/react";
import useTable from "./useTable";
// import noTabelData from "../../assets/images/noData.png";
// import Typography from "../Text/Typography";

const TableComponent = (props) => {
  const {
    items,
    columns: columnsDef,
    multiselect,
    selectedRows,
    setSelectedRows,
    updateRecord,
    rowAction,
    viewColumn,
    downloadCsv,
    loading,
    handleBulkSelection,
  } = props;

  const [allRowsSelected, setAllRowsSelected] = React.useState(false);
  const [someRowsSelected, setSomeRowsSelected] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const { convertColumn, columnSizingOptions } = useTable(
    columnsDef,
    setColumns,
    viewColumn
  );

  // console.log(loading.isOpen, loading.message);

  const { columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })]
  );

  const updateSelectionState = (selectedItems) => {
    const totalItems = items.length;
    const selectedCount = selectedItems.size;

    setAllRowsSelected(selectedCount === totalItems);
    setSomeRowsSelected(selectedCount > 0 && selectedCount < totalItems);
  };

  const {
    selection: { toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: multiselect ? "multiselect" : "single",
        defaultSelectedItems: new Set([]),
        selectedItems: selectedRows,
        onSelectionChange: (e, data) => {
          setSelectedRows(data.selectedItems);
          updateSelectionState(data.selectedItems);
        },
      }),
    ]
  );

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        defaultSortState: { sortColumn: "file", sortDirection: "ascending" },
      }),
    ]
  );

  const headerSortProps = (columnId) => ({
    onClick: (e) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(
    getRows((row) => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        onClick: (e) => toggleRow(e, row.rowId),
        onKeyDown: (e) => {
          if (e.key === " ") {
            e.preventDefault();
            toggleRow(e, row.rowId);
          }
        },
        selected,
        appearance: selected ? "brand" : "none",
      };
    })
  );

  // Update the selection state whenever selectedRows changes
  React.useEffect(() => {
    updateSelectionState(selectedRows);
  }, [selectedRows]);

  return (
    <Table
      sortable
      aria-label="Table with sort"
      ref={tableRef}
      style={{ overflow: "auto" }}
      className=""
    >
      <TableHeader
        style={{
          borderLeft: "4px solid #f7f9fc",
          outline: "none",
          margin: ".5rem 0",
          height: "40px",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <TableRow style={{ fontWeight: 600, backgroundColor: " #f7f9fc" }}>
          {multiselect && (
            <TableSelectionCell
              checked={
                allRowsSelected ? true : someRowsSelected ? "mixed" : false
              }
              onClick={(e) => {
                toggleAllRows(e);
                const newAllRowsSelected = !allRowsSelected;
                setAllRowsSelected(newAllRowsSelected);
                setSomeRowsSelected(false);
                const response = getRows((rows) => rows?.item);
                handleBulkSelection(response, newAllRowsSelected);
              }}
              checkboxIndicator={{ "aria-label": "Select all rows " }}
            />
          )}
          {columns?.map((column) => (
            <TableHeaderCell
              style={{ textTransform: "capitalize", fontWeight: 600 }}
              key={column?.columnId}
              {...columnSizing_unstable.getTableHeaderCellProps(
                column?.columnId
              )}
              {...headerSortProps(column?.columnId)}
            >
              {column?.renderHeaderCell()}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody style={{ position: "relative" }}>
        {loading?.isOpen ? (
          <Stack
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: 60,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : rows?.length === 0 ? (
          <Stack
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: 60,
            }}
          >
            {/* <img
              src={noTabelData}
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                marginTop: "125px",
                marginBottom: "30px",
              }}
              alt="no data found"
            /> */}
            <Typography variant="heading">
              No data available at the moment
            </Typography>
          </Stack>
        ) : (
          rows?.map(({ item, selected, onClick }, ind) => (
            <TableRow
              key={item._id}
              aria-selected={selected}
              onDoubleClick={() => !multiselect && rowAction && rowAction(item)}
              onClick={() => {
                updateRecord(item, multiselect);
                return onClick();
              }}
              selected={selected}
              // appearance={selected && "brand"}
              style={{
                borderLeft: selected
                  ? "4px solid #0f6fde"
                  : "4px solid transparent",
                borderBottom: items.length - 1 === ind && "none",
              }}
            >
              {multiselect && (
                <TableSelectionCell
                  checked={selected}
                  checkboxIndicator={{ "aria-label": "Select row" }}
                />
              )}
              {columns?.map((value, ind) => (
                <TableCell
                  key={value?.columnId}
                  {...columnSizing_unstable.getTableCellProps(value?.columnId)}
                >
                  {value?.renderCell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
