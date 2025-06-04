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
      columnId: "taskId", // this is the unique id for a column
      fieldName: "Task Id", // field name visible on header
      minWidth: 100,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.taskId || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "projectName", // this is the unique id for a column
      fieldName: "Project Name", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.projectName &&
            utilController?.formatTextToCapitalize(item?.projectName)}
        </TableCellLayout>
      ),
    },

    {
      columnId: "workerDetails", // this is the unique id for a column
      fieldName: "Worker Name", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.workerDetails} color="colorful" size={24} />{" "}
            {item?.workerDetails}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "workerMobileNumber", // this is the unique id for a column
      fieldName: "Mobile Number", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Tooltip content={item?.workerMobileNumber}>
            <Text truncate wrap={false} className={styles.text}>
              {item?.workerMobileNumber}
            </Text>
          </Tooltip>
        </TableCellLayout>
      ),
    },
    {
      columnId: "taskStatus", // this is the unique id for a column
      fieldName: "Status", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Text truncate wrap={false} className={styles.text}>
            {item?.taskStatus}
          </Text>
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
