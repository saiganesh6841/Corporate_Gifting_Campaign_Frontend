import React from "react";
import { ExportToCsv } from "export-to-csv";
import { enqueueSnackbar } from "notistack";
import useAlert from "../../../../../hooks/useAlert";
import { useMediaQuery } from "@mui/material";

const useTableFunctions = ({
  downloadCsv,
  viewColumn,
  setOpenForm,
  selectedRows,
  setSelectedRows,
  handleOpen,
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1084px)");
  const width = isLargeScreen ? "82.5%" : "75.2%";
  const { publishNotification, closeSnackbar } = useAlert();
  // const handleCsvExport = () => {
  //   // downloadcsv function whih is from useDownload hook gives the data of items to be downloaded
  //   const { data, headers } = downloadCsv(viewColumn);
  //   const options = {
  //     fieldSeparator: ",",
  //     quoteStrings: '"',
  //     decimalSeparator: ".",
  //     showLabels: true,
  //     // showTitle: true,
  //     title: "",
  //     useTextFile: false,
  //     useBom: true,
  //     // useKeysAsHeaders: true,
  //     headers, //<-- Won't work with useKeysAsHeaders present!
  //   };

  //   const csvExporter = new ExportToCsv(options);
  //   if (data?.length > 0) {
  //     csvExporter.generateCsv(data);
  //   } else {
  //     publishNotification("No data to export", "error");
  //   }
  // };
  const handleCsvExport = () => {
    const { data, headers } = downloadCsv(viewColumn);
    // console.log(data,headers,"excel download")

    console.log(data, "data");

    data.forEach((item, ind) => {
      item["Created By"] = item?.createdByUser;
      item["Role Name"] = item?.roleName;
      item["Created On"] = item?.createdAt;
      item["Updated On"] = item?.updatedAt;
      item["Updated By"] = item?.updatedByUser;
      // item[""] = item;
    });

    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      useTextFile: false,
      useBom: true,
      headers,
    };

    const csvExporter = new ExportToCsv(options);
    if (data?.length > 0) {
      csvExporter.generateCsv(data);
    } else {
      publishNotification("No data to export", "error");
    }
  };

  const handleUploadExcel = () => {
    setIsUploadModalOpen(true);
  };
  const add = () => {
    if (selectedRows?.length === 0) {
      handleOpen();
    } else {
      publishNotification(
        `Please unselect all records from the table`,
        "error"
      );
    }
  };
  const edit = () => {
    if (selectedRows[0]?.name === "Super Admin") {
      return publishNotification(`You cannot edit the super admin`, "error");
    }
    if (selectedRows?.length === 0 || selectedRows?.length > 1) {
      return publishNotification(
        `Please select one Record from the table`,
        "error"
      );
    }
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "edit",
        title: "Edit Role",
        rowDetails: selectedRows[0]?._id,
        width: 1000,
        hasCloseButton: false,
      };
    });
  };

  const view = () => {
    if (selectedRows?.length === 0 || selectedRows?.length > 1) {
      return publishNotification(
        `Please select one Record from the table`,
        "error"
      );
    }
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "view",
        title: "View Role",
        rowDetails: selectedRows[0]?._id,
        width: 1000,
        hasCloseButton: false,
      };
    });
  };

  const viewFilter = () => {
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "filter",
        title: "Filter",
        description: "",
        width: 500,
        hasCloseButton: true,
      };
    });
  };

  const Delete = () => {
    if (selectedRows[0]?.name === "Super Admin") {
      return publishNotification(`You cannot delete the super admin`, "error");
    }
    if (selectedRows?.length === 0) {
      publishNotification(`Please select at least one record.`, "error");
      return;
    }
    setOpenForm((p) => {
      return {
        ...p,
        isDialogOpen: true,
        divType: "deleteDialog",
        title: "Delete Record",
        rowDetails: selectedRows,
      };
    });
  };
  const assignRole = () => {
    if (selectedRows?.length === 0 || selectedRows?.length > 1) {
      return publishNotification(
        `Please select one Record from the table`,
        "error"
      );
    }
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "assignRole",
        title: "",
        description: "",
        width: 700,
        hasCloseButton: false,
      };
    });
  };

  const editColumn = () => {
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "column",
        title: "View Columns",
        description: "",
        width: 500,
        hasCloseButton: true,
      };
    });
  };
  return {
    handleCsvExport,
    add,
    editColumn,
    edit,
    Delete,
    assignRole,
    viewFilter,
    view,
  };
};

export default useTableFunctions;
