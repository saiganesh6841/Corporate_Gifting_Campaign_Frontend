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
      item["Project Id"] = item?.projectId;
      item["Location"] = item?.location?.props?.content;
      item["Start Date"] = item?.startDate;
      item["End Date"] = item?.endDate;
      item["Project Name"] = item?.projectName;
      item["Client Name"] = item?.clientName;
      item["Status"] = item?.status?.props?.children;
      item["Created On"] = item?.createdAt;
      item["Updated On"] = item?.updatedAt;
      item["Updated By"] = item?.updatedBy?.[2];
      item["Created By"] = item?.createdBy?.[2];
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
          title: "Create Project",
          width: 900,
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
          title: "View Project",
          width: 1000,
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
          title: "Edit Project",
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
