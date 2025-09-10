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
import { getStatusStyles } from "../../../../utils/StatusColor";

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
      columnId: "userId", // this is the unique id for a column
      fieldName: "User Id", // field name visible on header
      minWidth: 100,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.userId || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "userName", // this is the unique id for a column
      fieldName: "Worker", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.userName &&
            utilController?.formatTextToCapitalize(item?.userName)}
        </TableCellLayout>
      ),
    },

    {
      columnId: "attendanceDate", // this is the unique id for a column
      fieldName: "Date", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            {item?.attendanceDate}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "status", // this is the unique id for a column
      fieldName: "Status", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Text
            truncate
            wrap={false}
            className={styles.text}
            // style={getStatusStyles(item?.status)}
          >
            {item?.status}
          </Text>
        </TableCellLayout>
      ),
    },

    {
      columnId: "checkIn", // this is the unique id for a column
      fieldName: "Check-In",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {utilController.getFormattedDate(item?.checkIn)}
        </TableCellLayout>
      ),
    },
    {
      columnId: "checkOut", // this is the unique id for a column
      fieldName: "Check-Out",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.checkOut
            ? utilController.getFormattedDate(item?.checkOut)
            : "-"}
        </TableCellLayout>
      ),
    },
    {
      columnId: "workHours", // this is the unique id for a column
      fieldName: "Work Hours", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Text truncate wrap={false} className={styles.text}>
            {item?.workHours}
          </Text>
        </TableCellLayout>
      ),
    },
  ];
  return columns;
};

export default useTableHeader;
