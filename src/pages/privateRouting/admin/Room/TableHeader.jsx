import {
  TableCellLayout,
  Avatar,
  Text,
  makeStyles,
  Tooltip,
} from "@fluentui/react-components";
import { capitalize } from "@mui/material";
import * as React from "react";
import utilController from "../../../../utils/Utilcontroller";

const useStyles = makeStyles({
  text: {
    overflow: "hidden",
    width: "180px",
    display: "block",
  },
});

const useTableHeader = (setOpenForm, openForm) => {
  const styles = useStyles();

  const columns = [
    {
      columnId: "roomId", // this is the unique id for a column
      fieldName: "Room Id", // field name visible on header
      minWidth: 100,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.roomId || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "roomName", // this is the unique id for a column
      fieldName: "Room Name", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.roomName}
        </TableCellLayout>
      ),
    },

    {
      columnId: "createdBy", // this is the unique id for a column
      fieldName: "Created By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.createdBy} color="colorful" size={24} />{" "}
            {item?.createdBy}
          </TableCellLayout>
        );
      },
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
