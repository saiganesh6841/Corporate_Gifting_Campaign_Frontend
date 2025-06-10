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
      columnId: "projectId", // this is the unique id for a column
      fieldName: "Project Id", // field name visible on header
      minWidth: 100,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.projectId || ""}
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
      columnId: "clientName", // this is the unique id for a column
      fieldName: "Client Name", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            {item?.clientName}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "location", // this is the unique id for a column
      fieldName: "Location", // field name visible on header
      minWidth: 200,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Tooltip content={item?.location}>
            <Text truncate wrap={false} className={styles.text}>
              {item?.location}
            </Text>
          </Tooltip>
        </TableCellLayout>
      ),
    },
    {
      columnId: "startDate", // this is the unique id for a column
      fieldName: "Start Date",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {utilController.getFormattedDate(item?.startDate)}
        </TableCellLayout>
      ),
    },
    {
      columnId: "endDate", // this is the unique id for a column
      fieldName: "End Date",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {utilController.getFormattedDate(item?.endDate)}
        </TableCellLayout>
      ),
    },
    {
      columnId: "status", // this is the unique id for a column
      fieldName: "Status", // field name visible on header
      minWidth: 130,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          <Text
            truncate
            wrap={false}
            className={styles.text}
            style={getStatusStyles(item?.status)}
          >
            {item?.status}
          </Text>
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
            {item?.createdBy === undefined ? " " : item?.createdBy}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "updatedBy", // this is the unique id for a column
      fieldName: "Updated By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.updatedBy} color="colorful" size={24} />{" "}
            {item?.updatedBy === undefined ? " " : item?.updatedBy}
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

  const workerColumns = [
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
      columnId: "name", // this is the unique id for a column
      fieldName: "Name", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.name && utilController?.formatTextToCapitalize(item?.name)}
        </TableCellLayout>
      ),
    },

    {
      columnId: "mobileNumber", // this is the unique id for a column
      fieldName: "Mobile No", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            {item?.mobileNumber}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "email", // this is the unique id for a column
      fieldName: "Email", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            {item?.email}
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
  ];
  return {
    columns,
    workerColumns,
  };
};

export default useTableHeader;
