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
      columnId: "userType", // this is the unique id for a column
      fieldName: "User Type", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ text: capitalize }}>
          {item?.userType &&
            utilController?.formatTextToCapitalize(item?.userType)}
        </TableCellLayout>
      ),
    },
    // {
    //   columnId: "userName", // this is the unique id for a column
    //   fieldName: "User Name", // field name visible on header
    //   minWidth: 150,
    //   renderCell: (item) => (
    //     <TableCellLayout truncate>{item?.userName}</TableCellLayout>
    //   ),
    // },
    {
      columnId: "name", // this is the unique id for a column
      fieldName: "Full Name", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.fname} ${item?.lname}`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar name={item?.fullName} color="colorful" size={24} />{" "}
            {item?.fullName}
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

    // {
    //   columnId: "department", // this is the unique id for a column
    //   fieldName: "Department",
    //   minWidth: 150,
    //   renderCell: (item) => {
    //     const department = utilController?.formatTextToCapitalize(
    //       item?.department
    //     );

    //     return (
    //       <TableCellLayout truncate>
    //         <Tooltip content={department}>
    //           <Text
    //             truncate
    //             wrap={false}
    //             className={styles.text}
    //             style={{ width: "130px" }}
    //           >
    //             {department}
    //           </Text>
    //         </Tooltip>
    //       </TableCellLayout>
    //     );
    //   },
    // },
    // {
    //   columnId: "permission.name", // this is the unique id for a column
    //   fieldName: "Role",
    //   minWidth: 150,
    //   renderCell: (item) => (
    //     <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
    //       {item?.permission?.name}
    //     </TableCellLayout>
    //   ),
    // },
    {
      columnId: "createdBy", // this is the unique id for a column
      fieldName: "Created By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.createdBy?.fname || ""} ${
        //   item?.createdBy?.lname || ""
        // }`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar
              name={item?.createdBy?.fullName}
              color="colorful"
              size={24}
            />{" "}
            {item?.createdBy?.fullName === undefined
              ? " "
              : item?.createdBy?.fullName}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "operatedBy", // this is the unique id for a column
      fieldName: "Updated By", // field name visible on header
      minWidth: 200,

      renderCell: (item) => {
        // const fullName = `${item?.operatedBy?.fname || ""} ${
        //   item?.operatedBy?.lname || ""
        // }`;
        return (
          <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
            <Avatar
              name={item?.operatedBy?.fullName}
              color="colorful"
              size={24}
            />{" "}
            {item?.operatedBy?.fullName === undefined
              ? " "
              : item?.operatedBy?.fullName}
          </TableCellLayout>
        );
      },
    },
    {
      columnId: "dob", // this is the unique id for a column
      fieldName: "Date Of Birth",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.dob ?? "NA"}
        </TableCellLayout>
      ),
    },
    {
      columnId: "gender", // this is the unique id for a column
      fieldName: "Gender",
      minWidth: 170,
      renderCell: (item) => (
        <TableCellLayout truncate style={{ textTransform: "capitalize" }}>
          {item?.gender ? item?.gender : "NA"}
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
