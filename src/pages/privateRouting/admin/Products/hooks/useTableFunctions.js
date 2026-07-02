import { ExportToCsv } from "export-to-csv";
import useAlert from "../../../../../hooks/useAlert";

const useTableFunctions = ({
  downloadCsv,
  viewColumn,
  setOpenForm,
  getDetails,
  recordId,
  handleDelete,
  // dismissDelete,
  // clearFuction,
  // openErrorSnackbar,
  // dualOpen,
  // removeSelectedRows,
  // clearSelectedRows,
  // fetchRoles,
  // updatePasswordAttempts,
  // setIsResetPasswordAttempt,
  setIsUploadModalOpen,
  handleRestore,
}) => {
  const { publishNotification, closeSnackbar } = useAlert();

  const handleCsvExport = () => {
    const { data, headers } = downloadCsv(viewColumn);

    console.log(data, "daata");

    data.forEach((item, ind) => {
      // const itemNameCopy = item?.name;
      // const operatedByCopy = item?.operatedBy;
      // const email = item?.email?.props.content;
      // const createdBy = item?.createdBy[2];
      // // const department = item?.department?.props.content;
      item["User Type"] = item?.userId;
      item["Full Name"] = item?.fullName?.[2];
      item["Email"] = item?.email?.props?.content;
      item["Mobile Number"] = item?.mobileNumber?.props?.content;
      item["Created By"] = item?.createdBy?.[2];
      item["Updated By"] = item?.updatedBy?.[2];

      item["User Id"] = item?.userId;
      item["Gender"] = item?.gender;
      item["Date Of Birth"] = item?.dob;
      item["Created On"] = item?.createdAt;
      item["Updated On"] = item?.updatedAt;
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
    if (recordId.length < 1) {
      setOpenForm((p) => {
        return {
          ...p,
          isOpen: true,
          divType: "add",
          title: "Create User",
          width: 700,
          hasCloseButton: false,
        };
      });
    } else {
      publishNotification(
        "Please unselect all records for creating user",
        "error",
      );
    }
  };

  const view = () => {
    if (recordId.length === 1) {
      // fetchRoles();
      // getDetails();
      setOpenForm((p) => {
        return {
          ...p,
          isOpen: true,
          divType: "view",
          title: "View user",
          width: 700,
          hasCloseButton: false,
          rowDetails: recordId,
        };
      });
    } else if (recordId.length > 1) {
      publishNotification("Please select only one record", "error");
    } else {
      publishNotification("Please select a record", "error");
    }
  };

  // const edit = () => {
  //   if (recordId.length === 1) {
  //     // fetchRoles();
  //     // getDetails();
  //     setOpenForm((p) => {
  //       return {
  //         ...p,
  //         isOpen: true,
  //         divType: "edit",
  //         title: "Edit user",
  //         width: 700,
  //         hasCloseButton: false,
  //         rowDetails: recordId,
  //       };
  //     });
  //   } else if (recordId.length === 2) {
  //     publishNotification("Please select only one record", "error");
  //   } else {
  //     publishNotification("Please select a record", "error");
  //   }
  // };
  const edit = (selectedRecord) => {
    const rows = selectedRecord ? [selectedRecord] : recordId;

    if (rows.length === 1) {
      setOpenForm((p) => ({
        ...p,
        isOpen: true,
        divType: "edit",
        title: "Edit User",
        width: 700,
        hasCloseButton: false,
        rowDetails: rows,
      }));
    } else if (rows.length > 1) {
      publishNotification("Please select only one record", "error");
    } else {
      publishNotification("Please select a record", "error");
    }
  };
  const viewFilter = () => {
    setOpenForm((p) => {
      return {
        // ...p,
        isOpen: true,
        divType: "filter",
        title: "Filter",
        description: "",
        width: 500,
        hasCloseButton: true,
      };
    });
  };

  const editColumn = () => {
    setOpenForm((p) => {
      return {
        ...p,
        isOpen: true,
        divType: "column",
        title: "Choose Columns",
        description: "",
        width: 500,
        hasCloseButton: true,
      };
    });
  };

  const Delete = () => {
    if (recordId.length > 0) {
      handleDelete();
    }
    if (recordId.length === 0) {
      publishNotification("Please select at least one record", "error");
    }
  };
  const restore = () => {
    if (recordId.length > 0) {
      handleRestore();
    }
    if (recordId.length === 0) {
      publishNotification("Please select at least one record", "error");
    }
  };

  return {
    handleCsvExport,
    add,
    edit,
    viewFilter,
    editColumn,
    Delete,
    handleUploadExcel,
    view,
    restore,
  };
};

export default useTableFunctions;
