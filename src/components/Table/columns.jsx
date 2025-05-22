import {
  Avatar,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import * as React from "react";

export const columns = [
  {
    columnId: "file", // this is the unique id for a column
    fieldName: "File", // field name visible on header
    minWidth: 200,
    primaryKey: true, // this is the primary one which cant be disabled in column option
    renderCell: (item) => (
      // what should be rendered on the cell
      <TableCellLayout truncate media={item?.file.icon}>
        {item.file.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "author", // this is the unique id for a column
    fieldName: "Author",
    minWidth: 200,
    renderCell: (item) => (
      <TableCellLayout
        truncate
        media={
          <Avatar
            aria-label={item.author.label}
            name={item.author.label}
            badge={{ status: item.author.status }}
          />
        }
      >
        {item.author.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "lastUpdated", // this is the unique id for a column
    fieldName: "Updated At",
    minWidth: 240,
    renderCell: (item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "lastUpdate", // this is the unique id for a column
    fieldName: "Last Update",
    minWidth: 220,
    renderCell: (item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "author", // this is the unique id for a column
    fieldName: "Author",
    minWidth: 200,
    renderCell: (item) => (
      <TableCellLayout
        truncate
        media={
          <Avatar
            aria-label={item.author.label}
            name={item.author.label}
            badge={{ status: item.author.status }}
          />
        }
      >
        {item.author.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "lastUpdated", // this is the unique id for a column
    fieldName: "Updated At",
    minWidth: 240,
    renderCell: (item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  },
  {
    columnId: "lastUpdate", // this is the unique id for a column
    fieldName: "Last Update",
    minWidth: 220,
    renderCell: (item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  },

  // createTableColumn({
  //   columnId: "author",
  //   renderHeaderCell: () => <>Author</>,
  //   renderCell: (item) => (
  //     <TableCellLayout
  //       truncate
  //       media={
  //         <Avatar
  //           aria-label={item.author.label}
  //           name={item.author.label}
  //           badge={{ status: item.author.status }}
  //         />
  //       }
  //     >
  //       {item.author.label}
  //     </TableCellLayout>
  //   ),
  // }),
  //   createTableColumn({
  //     columnId: "lastUpdated",
  //     renderHeaderCell: () => <>Last updated</>,
  //     renderCell: (item) => (
  //       <TableCellLayout truncate media={item.lastUpdate.icon}>
  //         {item.lastUpdated.label}
  //       </TableCellLayout>
  //     ),
  //   }),
  //   createTableColumn({
  //     columnId: "lastUpdate",
  //     renderHeaderCell: () => <>Last update</>,
  //     renderCell: (item) => (
  //       <TableCellLayout truncate media={item.lastUpdate.icon}>
  //         {item.lastUpdate.label}
  //       </TableCellLayout>
  //     ),
  //   }),
];
