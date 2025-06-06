import { ExportToCsv } from "export-to-csv";
import useAlert from "../../../../../hooks/useAlert";

const useTableFunctions = ({
  downloadCsv,
  viewColumn,
  setOpenForm,
  getDetails,
  recordId,
  handleDelete,

  setIsUploadModalOpen,
  handleRestore,
}) => {
  const { publishNotification, closeSnackbar } = useAlert();

  const handleCsvExport = () => {
    const { data, headers } = downloadCsv(viewColumn);
    // console.log(data,headers,"excel download")

    console.log(data, "data");

    data.forEach((item, ind) => {
      item["Worker"] = item?.userName;
      item["User Id"] = item?.userId;
      item["Date"] = item?.attendanceDate;
      item["Status"] = item?.status;
      item["Work Hours"] = item?.workHours?.props?.children;
      item["Check-Out"] = item?.checkOut;
      item["Check-In"] = item?.checkIn;
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
          title: "Create Schedule Time",
          width: 700,
          hasCloseButton: false,
        };
      });
    } else {
      publishNotification(
        "Please unselect all records for creating user",
        "error"
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
          title: "View Schedule Time",
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

  const edit = () => {
    if (recordId.length === 1) {
      // fetchRoles();
      // getDetails();
      setOpenForm((p) => {
        return {
          ...p,
          isOpen: true,
          divType: "edit",
          title: "Edit Schedule Time",
          width: 900,
          hasCloseButton: false,
          rowDetails: recordId,
        };
      });
    } else if (recordId.length === 2) {
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
