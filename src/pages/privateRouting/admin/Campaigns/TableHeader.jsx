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
      columnId: "occasion", // this is the unique id for a column
      fieldName: "Occasion", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.occasion || ""}
        </TableCellLayout>
      ),
    },
    {
      columnId: "budgetPerEmployee", // this is the unique id for a column
      fieldName: "Budget Per Employee", // field name visible on header
      minWidth: 170,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            {item?.budgetPerEmployee || 0}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "giftingModel", // this is the unique id for a column
      fieldName: "Gifting Model", // field name visible on header
      minWidth: 120,

      renderCell: (item) => (
        // what should be rendered on the cell
        <TableCellLayout truncate>
          {/* <Tooltip content={item?.giftingModel}> */}
          <Text truncate wrap={false} className={styles.text}>
            {item?.giftingModel === "hr_selected"
              ? "HR Selected"
              : item?.giftingModel === "employee_selected"
                ? "Employee Selected"
                : item?.giftingModel}
          </Text>
          {/* </Tooltip> */}
        </TableCellLayout>
      ),
    },
    {
      columnId: "deliveryWindow",
      fieldName: "Delivery Window",
      minWidth: 200,

      renderCell: (item) => {
        const start = item?.deliveryWindowStart
          ? utilController.getFormattedDate(item.deliveryWindowStart)
          : "-";

        const end = item?.deliveryWindowEnd
          ? utilController.getFormattedDate(item.deliveryWindowEnd)
          : "-";

        const deliveryWindow = `${start} - ${end}`;

        return (
          <TableCellLayout truncate>
            <Tooltip content={deliveryWindow} relationship="label">
              <Text truncate wrap={false} className={styles.text}>
                {deliveryWindow}
              </Text>
            </Tooltip>
          </TableCellLayout>
        );
      },
    },

    {
      columnId: "campaignDeadline", // this is the unique id for a column
      fieldName: "Campaign Deadline",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.campaignDeadline
            ? utilController.getFormattedDate(item?.campaignDeadline)
            : "-"}
        </TableCellLayout>
      ),
    },
    {
      columnId: "totalEmployees", // this is the unique id for a column
      fieldName: "Total Employees",
      minWidth: 120,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.totalEmployees ? item?.totalEmployees : "-"}
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
