import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { useStyles } from "./styles/style";
import { Separator } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Stack } from "@mui/material";
import {
  activeLabels,
  form,
  inactiveLabels,
  queryBody,
} from "./constants/constant";
import { tableButtons } from "../../../../components/tableButtons/TableButtons";
import useTableHeader from "./TableHeader";
import useTable from "./hooks/useTable";
import useServices from "./hooks/useServices";
import useTableFunctions from "./hooks/useTableFunctions";
import useDownloadCSV from "../../../../hooks/useDownloadCSV";
import LocalStorage from "../../../../config/LocalStorage";
import Header from "../../../../components/HeaderUi/Index";
import Toolbar from "../../../../components/EnhancedToolbar/Toolbar";
import TableComponent from "../../../../components/Table/Table";
import Pagination from "../../../../components/Table/Pagination";
import { PanelConfirmation } from "../../../../components/confirmationpanel/Index";
import OnRenderFooterContent from "../../../../components/panelFooter/Footer";
import AEVForm from "./components/AEVForm";
import CustomFilter from "../../../../components/customFilter/Index";
import ViewColumn from "../../../../components/ViewColumn/Index";
import ConfirmationModal from "../../../../components/ConfirmationModal/Index";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

function ProgressTimeline() {
  const classes = useStyles();
  const theme = useTheme();
  const [query, setQuery] = useState({ ...queryBody });
  const [openForm, setOpenForm] = useState({ ...form });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [errors, setErrors] = useState({});
  // active and inactive buttons function
  const inactiveTableButton = tableButtons.filter((item) =>
    inactiveLabels.includes(item.id)
  );
  const activeTableButton = tableButtons.filter(
    (item) => !activeLabels.includes(item.id)
  );

  const resetForm = () => {
    setOpenForm({ ...form });
    clearSelectedRows();
    setRecordId([]);
    setErrors({});
  };

  const resetRecords = () => {
    clearSelectedRows();
    setRecordId([]);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };
  const dismissDelete = () => {
    setIsDeleteOpen(false);
    clearSelectedRows();
    setRecordId([]);
  };

  const columns = useTableHeader(setOpenForm, openForm);
  const {
    viewColumn,
    setViewColumn,
    handlerowAction,
    clickRecordAction,
    clearSelectedRows,
    setSelectedRows,
    selectedRows,
    handleBulkSelection,
    recordId,
    setRecordId,
    filterColumn,
  } = useTable(columns, setOpenForm, resetForm); // table hook
  const services = useServices({
    query,
    recordId,
    dismissDelete,
    openForm,
    setOpenForm,
    clearSelectedRows,
    resetRecords,
    // dismissRestore,
    errors,
    setErrors,
    resetForm,
  });

  const { downloadCsv } = useDownloadCSV(columns, services?.tableData); // download excel sheet hook

  const tableFunctions = useTableFunctions({
    downloadCsv,
    viewColumn,
    setOpenForm,
    recordId,
    handleDelete,
    clearSelectedRows,
    // handleRestore,
  });

  useEffect(() => {
    setButtonDetails(LocalStorage.adminButtonPermission);
  }, [LocalStorage.adminButtonPermission]);

  const [buttonList, setButtonDetails] = useState([]);

  const buttonListFiltered = (data) => {
    return data
      ?.filter((value, i) => !value?.disable)
      ?.map((value) => value?.button);
  };

  const resetQueryBody = () => {
    setQuery({ ...queryBody });
    // setOpenForm({ ...form });
  };
  console.log(isDeleteOpen, "data");
  return (
    <div className={classes.root}>
      <Header classes={classes} text="Progress Timeline" />

      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "14px",
          height: "70vh",
          borderRadius: "10px",
        }}
      >
        <AEVForm
          classes={classes}
          services={services}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    shortcutKeyValue: state.shortcutKeyValue,
    sideDrawerData: state.sideDrawerData,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    shortcutKey: (shortcutKeyValue) =>
      dispatch({ type: "SHORTCUTKEY", value: shortcutKeyValue }),
    publishNotification: (notification) =>
      dispatch({ type: "NOTIFICATION_OPEN", value: notification }),
  };
};
// export default User;
export default withTranslation("translations")(
  connect(mapStateToProps, mapDispachToProps)(ProgressTimeline)
);
