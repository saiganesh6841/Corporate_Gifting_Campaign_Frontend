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
import { Eye20Regular, Eye24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  text: {
    overflow: "hidden",
    width: "180px",
    display: "block",
  },
});

const useTableHeader = (setOpenForm, openForm, setIsOpen, setModalData) => {
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
    {
      columnId: "roomName", // this is the unique id for a column
      fieldName: "Action", // field name visible on header
      minWidth: 120,
      primaryKey: true,
      renderCell: (item) => (
        <TableCellLayout
          truncate
          style={{
            textTransform: "capitalize", // optional: adds spacing between icon and text
          }}
        >
          <div
            onClick={() => {
              setModalData({
                logo: item?.roomLogo,
                color: item?.color,
              });
              setIsOpen(true);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#561E1E",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Eye24Regular />
            Preview
          </div>
        </TableCellLayout>
      ),
    },
  ];
  return columns;
};

export default useTableHeader;
