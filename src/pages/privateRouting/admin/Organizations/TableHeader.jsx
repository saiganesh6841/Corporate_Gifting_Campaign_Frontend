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
      columnId: "companyName", // this is the unique id for a column
      fieldName: "Company Name", // field name visible on header
      minWidth: 120,
      primaryKey: true,

      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.name && utilController?.formatTextToCapitalize(item?.name)}
        </TableCellLayout>
      ),
    },
    {
      columnId: "fullName", // this is the unique id for a column
      fieldName: "Contact Person Name", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.contactPersonName} color="colorful" size={24} />{" "}
            {item?.contactPersonName}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "email", // this is the unique id for a column
      fieldName: "Email", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Tooltip content={item?.email}>
            <Text truncate wrap={false} className={styles.text}>
              {item?.email}
            </Text>
          </Tooltip>
        </TableCellLayout>
      ),
    },
    {
      columnId: "mobileNumber", // this is the unique id for a column
      fieldName: "Mobile Number", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Tooltip content={item?.mobileNumber}>
            <Text truncate wrap={false} className={styles.text}>
              {item?.mobileNumber}
            </Text>
          </Tooltip>
        </TableCellLayout>
      ),
    },

    {
      columnId: "city", // this is the unique id for a column
      fieldName: "City",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.city ? item?.city : "-"}
        </TableCellLayout>
      ),
    },
    {
      columnId: "state", // this is the unique id for a column
      fieldName: "State",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.state ? item?.state : "-"}
        </TableCellLayout>
      ),
    },
    {
      columnId: "createdByUser", // this is the unique id for a column
      fieldName: "Created By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.createdByUser} color="colorful" size={24} />{" "}
            {item?.createdByUser === undefined ? " " : item?.createdByUser}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "updatedByUser", // this is the unique id for a column
      fieldName: "Updated By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.updatedByUser} color="colorful" size={24} />{" "}
            {item?.updatedByUser === undefined ? " " : item?.updatedByUser}
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
