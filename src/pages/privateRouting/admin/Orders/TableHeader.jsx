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
      columnId: "campaignName", // this is the unique id for a column
      fieldName: "Campaign Name", // field name visible on header
      minWidth: 200,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.campaignName || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "employeeName", // this is the unique id for a column
      fieldName: "Employee Name", // field name visible on header
      minWidth: 200,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.employeeName || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "quantity", // this is the unique id for a column
      fieldName: "Quantity", // field name visible on header
      minWidth: 70,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.quantity || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "productName", // this is the unique id for a column
      fieldName: "Product Name", // field name visible on header
      minWidth: 170,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Tooltip content={item?.productSnapshot?.name}>
              <Text truncate wrap={false} className={styles.text}>
                {item?.productSnapshot?.name || 0}
              </Text>
            </Tooltip>
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "status", // this is the unique id for a column
      fieldName: "Status", // field name visible on header
      minWidth: 120,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          {/* <Tooltip content={item?.giftingModel}> */}
          <Text truncate wrap={false} className={styles.text}>
            {item?.status || "-"}
          </Text>
          {/* </Tooltip> */}
        </TableCellLayout>
      ),
    },
    {
      columnId: "price",
      fieldName: "Price",
      minWidth: 80,

      renderCell: (item) => {
        return (
          <TableCellLayout truncate>
            <Text truncate wrap={false} className={styles.text}>
              {item?.price}
            </Text>
          </TableCellLayout>
        );
      },
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
