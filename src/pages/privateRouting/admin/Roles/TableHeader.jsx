import {
  Avatar,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import * as React from "react";

import { MoreVertical24Regular } from "@fluentui/react-icons";
import { Popover } from "../../../../components/popover/Index";

import {
  Accessibility32Regular,
  ChevronDown24Filled,
  Edit24Regular,
  Delete32Regular,
  ConvertRange24Regular,
  Edit32Regular,
} from "@fluentui/react-icons";
import utilController from "../../../../utils/Utilcontroller";

const useTableHeader = (setOpenForm, openForm, services) => {
  const columns = [
    {
      columnId: "roleName", // this is the unique id for a column
      fieldName: "Role Name", // field name visible on header
      minWidth: 130,
      primaryKey: true, // this is the primary one which cant be disabled in column option
      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout style={{ color: "#323130" }} truncate>
          {item?.name}
        </TableCellLayout>
      ),
    },
    {
      columnId: "owner", // this is the unique id for a column
      fieldName: "Created By",
      minWidth: 150,
      renderCell: (item) => (
        <TableCellLayout style={{ textTransform: "capitalize" }} truncate>
          {`${
            item?.createdBy?.fullName === undefined
              ? " "
              : item?.createdBy?.fullName
          }`}
        </TableCellLayout>
      ),
    },

    {
      columnId: "createdAt", // this is the unique id for a column
      fieldName: "Created On",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {utilController.getFormattedDate(item?.createdAt)}
        </TableCellLayout>
      ),
    },
    {
      columnId: "updatedAt", // this is the unique id for a column
      fieldName: "Updated On",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {utilController.getFormattedDate(item?.updatedAt)}
        </TableCellLayout>
      ),
    },
  ];
  return columns;
};

export default useTableHeader;
