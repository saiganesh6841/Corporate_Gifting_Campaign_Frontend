import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { useStyles } from "./styles/style";
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

function Room() {
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
      <Header classes={classes} text="Room" />

      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "14px",
          height: "70vh",
          borderRadius: "10px",
        }}
      >
        <Toolbar
          classes={classes}
          tableButtons={query?.active ? activeTableButton : inactiveTableButton}
          buttonList={buttonListFiltered(buttonList)}
          buttonFunctions={{ ...tableFunctions }}
          themeColor={theme?.palette?.primary?.main}
          setRecordId={setRecordId}
          setQuery={setQuery}
          resetRecords={resetRecords}
        />

        <FluentProvider theme={teamsLightTheme}>
          <Stack
            style={{
              marginTop: "1rem",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "15px",
            }}
            className="tablegrid"
          >
            <TableComponent
              items={services?.tableData?.rows || []}
              columns={columns}
              multiselect={true}
              viewColumn={viewColumn}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              updateRecord={clickRecordAction}
              rowAction={handlerowAction}
              loading={services?.loading}
              handleBulkSelection={handleBulkSelection}
            />
          </Stack>
          <Pagination
            query={query}
            setQuery={setQuery}
            tableData={services?.tableData}
          />
          <PanelConfirmation
            isNoFooter={openForm?.divType === "column"}
            isOpen={openForm?.isOpen}
            title={openForm?.title}
            width={openForm?.width}
            hasCloseButton={openForm?.hasCloseButton}
            dismissPanel={resetForm}
            onRenderFooterContent={() => (
              <OnRenderFooterContent
                field1={{
                  text: openForm?.divType === "view" ? "" : "Submit",
                  handle: () => {
                    setOpenForm({
                      ...openForm,
                      isSaveForm: true,
                    });
                  },
                }}
                field2={{
                  text: openForm?.divType === "filter" ? "Reset" : "Cancel",
                  handle:
                    openForm?.divType === "filter" ? resetQueryBody : resetForm,
                }}
              />
            )}
          >
            {(openForm?.divType === "add" ||
              openForm?.divType === "edit" ||
              openForm?.divType === "view") && (
              <AEVForm
                classes={classes}
                services={services}
                openForm={openForm}
                setOpenForm={setOpenForm}
              />
            )}
            {openForm?.divType === "filter" && (
              <CustomFilter
                query={query}
                setQuery={setQuery}
                openForm={openForm}
                resetForm={resetForm}
                resetQueryBody={resetQueryBody}
                inventory={true}
                orders={true}
              />
            )}
            {openForm?.divType === "column" && (
              <ViewColumn
                filteredColumn={viewColumn}
                openForm={openForm}
                resetForm={resetForm}
                setViewColumn={setViewColumn}
                filterColumn={filterColumn(columns)}
              />
            )}
          </PanelConfirmation>
          <ConfirmationModal
            isOpen={isDeleteOpen}
            onDismissModal={dismissDelete}
            title={
              recordId?.length > 1
                ? `${isDeleteOpen ? "Delete" : "Restore"} Rooms`
                : `${isDeleteOpen ? "Delete" : "Restore"} Room`
            }
            content={`Are you sure you want to ${
              isDeleteOpen ? "delete" : "restore"
            } selected ${recordId?.length > 1 ? "Rooms" : "Room"}?`}
            Button={"Delete"}
            onClick={isDeleteOpen && services?.deleteUser}
          />
        </FluentProvider>
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
  connect(mapStateToProps, mapDispachToProps)(Room)
);
