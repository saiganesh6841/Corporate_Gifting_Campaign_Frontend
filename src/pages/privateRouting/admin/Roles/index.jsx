import { Separator } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ConfirmationModal from "../../../../components/ConfirmationModal/Index";
import Toolbar from "../../../../components/EnhancedToolbar/Toolbar";
import Header from "../../../../components/HeaderUi/Index";
import Pagination from "../../../../components/Table/Pagination";
import TableComponent from "../../../../components/Table/Table";
// import { PanelConfirmation } from "../../../../components/confirmationpanel/Index";
import CustomFilter from "../../../../components/customFilter/Index";
// import OnRenderFooterContent from "../../../../components/panelFooter/Footer";
import { tableButtons } from "../../../../components/tableButtons/TableButtons";
import ViewColumn from "../../../../components/viewcolumn/Index";
import LocalStorage from "../../../../config/LocalStorage";
import useDownloadCSV from "../../../../hooks/useDownloadCSV";
import useTableHeader from "./TableHeader";
import AddRole from "./components/AddRole";
import AssignRole from "./components/AssignRole";
import EditRole from "./components/EditRole";
import useServices from "./hooks/useServices";
import useTable from "./hooks/useTable";
import useTableFunctions from "./hooks/useTableFunctions";
import { useStyles } from "./styles/style";
import { addFormDetails, form, queryBody } from "./constants/constant";
import { PanelConfirmation } from "../../../../components/confirmationpanel/Index";
import OnRenderFooterContent from "../../../../components/panelFooter/Footer";

function Roles(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [query, setQuery] = useState(queryBody);
  const [openForm, setOpenForm] = useState(form); // this is where the form for add,edit
  const [assigned, setAssigned] = useState([]);
  const [unAssigned, setUnAssigned] = useState([]);
  const [addForm, setAddForm] = useState(addFormDetails);
  const [recordId, setRecordId] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const resetForm = () => {
    setOpenForm({ ...form });
    clearSelectedRows();
    setRecordId([]);
    setErrors({});
  };

  const resetRecords = () => {
    setSelectedRows([]);
    setRecordId([]);
  };

  const resetAddForm = () => {
    setAddForm(addFormDetails);
  };
  const {
    addRoleObject,
    setAddRoleObject,
    resetRoleObject,
    addRole,
    handleOpen,
    handleClose,
    open,
    setOpen,
    tableData,
    loading,
    tableQuery,
    handleDeleteRecord,
    updateRole,
    assignRole,
    errors,
    setErrors,
  } = useServices({
    openForm,
    setOpenForm,
    query,
    resetForm,
    resetRecords,
    resetAddForm,
    addForm,
    recordId,
    assigned,
  });

  const columns = useTableHeader(setOpenForm, openForm);

  const {
    viewColumn,
    handlerowAction,
    clickRecordAction,
    handleBulkSelection,
    setViewColumn,
    filterColumn,
  } = useTable(
    columns,
    setOpenForm,
    resetForm,
    selectedRows,
    setSelectedRows,
    recordId,
    setRecordId,
  );
  const { downloadCsv } = useDownloadCSV(columns, tableData); // download excel sheet hook

  const tableFunctions = useTableFunctions({
    downloadCsv,
    viewColumn,
    setOpenForm,
    selectedRows: recordId,
    handleOpen,
    handleClose,
  });
  useEffect(() => {
    setButtonDetails(LocalStorage.adminButtonPermission);
  }, [LocalStorage.adminButtonPermission]);

  const [buttonList, setButtonDetails] = useState([]);

  const buttonListFiltered = (data) => {
    if (!query.active) {
      // If query.active is false, return only the "Edit" button
      return data
        ?.filter((value) => value.button === "edit")
        ?.map((value) => value.button);
    }
    // Otherwise, return all buttons except the disabled ones
    return data
      ?.filter((value) => !value?.disable)
      ?.map((value) => value?.button);
  };

  const resetQueryBody = () => {
    setQuery({ ...queryBody });
    // setOpenForm({ ...form });
  };

  return (
    <>
      <div className={classes.root}>
        <Header classes={classes} text="Roles" />

        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "14px",
            height: "70vh",
            borderRadius: "10px",
          }}
        >
          <Toolbar
            // handleSearch={(searchValue) =>
            //   setQuery({ ...query, keyword: searchValue })
            // }
            classes={classes}
            tableButtons={tableButtons} // this is table btn at left side
            buttonList={buttonListFiltered(buttonList)}
            buttonFunctions={{ ...tableFunctions }}
            themeColor={theme?.palette?.primary?.main}
            setQuery={setQuery}
            query={query}
            downloadCsv={downloadCsv}
            viewColumn={viewColumn}
            resetRecords={resetRecords}
          >
            {/* pass the children */}
          </Toolbar>

          <FluentProvider theme={teamsLightTheme}>
            <Stack
              style={{
                marginTop: "2rem",
                boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "5px",
                // overflow: "auto",
              }}
              className="tablegrid"
            >
              <TableComponent
                items={tableData?.rows || []}
                columns={columns}
                multiselect={true} // default will be single whereas developer can move to multiple selections
                viewColumn={viewColumn}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                updateRecord={clickRecordAction}
                rowAction={handlerowAction}
                loading={loading}
                handleBulkSelection={handleBulkSelection}
              />
            </Stack>
            <Pagination
              query={query}
              setQuery={setQuery}
              tableData={tableData}
            />
            {openForm?.isOpen && (
              <PanelConfirmation
                isNoFooter={openForm.divType === "column"}
                isOpen={openForm?.isOpen}
                title={openForm?.title}
                width={openForm?.width}
                hasCloseButton={
                  openForm.divType === "column"
                    ? !openForm?.hasCloseButton
                    : openForm?.hasCloseButton
                }
                dismissPanel={resetForm}
                onRenderFooterContent={() => (
                  <OnRenderFooterContent
                    field1={{
                      text:
                        openForm?.divType === "column"
                          ? "Reset"
                          : openForm?.divType === "add"
                            ? "Save"
                            : "Save",
                      handle: () =>
                        setOpenForm({
                          ...openForm,
                          isSaveForm:
                            openForm?.divType === "add"
                              ? addRole()
                              : openForm?.divType === "edit"
                                ? updateRole()
                                : openForm?.divType === "assignRole"
                                  ? assignRole()
                                  : true,
                        }),
                    }}
                    field2={{
                      text: "Cancel",
                      handle:
                        openForm?.divType === "filter"
                          ? resetQueryBody
                          : resetForm,
                    }}
                  />
                )}
              >
                {openForm?.isOpen && openForm?.divType === "edit" && (
                  <EditRole
                    openForm={openForm}
                    setOpenForm={setOpenForm}
                    classes={classes}
                    recordId={recordId[0]?._id}
                    setAddForm={setAddForm}
                    addForm={addForm}
                    setAssigned={setAssigned}
                    setUnAssigned={setUnAssigned}
                    assigned={assigned}
                    unAssigned={unAssigned}
                    addFormDetails={addFormDetails}
                    resetRecords={resetRecords}
                    errors={errors}
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
                {openForm?.isOpen && openForm?.divType === "assignRole" && (
                  <AssignRole
                    formDialog={openForm}
                    rowDetails={recordId[0]}
                    tableQuery={tableQuery}
                    isAssign={openForm?.isOpen}
                    recordId={recordId[0]?._id}
                    setAddForm={setAddForm}
                    addForm={addForm}
                    setAssigned={setAssigned}
                    setUnAssigned={setUnAssigned}
                    assigned={assigned}
                    unAssigned={unAssigned}
                    resetRecords={resetRecords}
                  />
                )}
                {openForm?.divType === "filter" && (
                  <CustomFilter
                    query={query}
                    setQuery={setQuery}
                    openForm={openForm}
                    resetForm={resetForm}
                    roles={true}
                  />
                )}
              </PanelConfirmation>
            )}
            {/* <PanelConfirmation
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
                      openForm?.divType === "filter"
                        ? resetQueryBody
                        : resetForm,
                  }}
                />
              )}
            >
              {openForm?.isOpen && openForm?.divType === "edit" && (
                <EditRole
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                  classes={classes}
                  recordId={recordId[0]?._id}
                  setAddForm={setAddForm}
                  addForm={addForm}
                  setAssigned={setAssigned}
                  setUnAssigned={setUnAssigned}
                  assigned={assigned}
                  unAssigned={unAssigned}
                  addFormDetails={addFormDetails}
                  resetRecords={resetRecords}
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
            </PanelConfirmation> */}

            <AddRole
              openForm={openForm}
              setOpenForm={setOpenForm}
              classes={classes}
              addRoleObject={addRoleObject}
              setAddRoleObject={setAddRoleObject}
              resetRoleObject={resetRoleObject}
              addRole={addRole}
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              resetRecords={resetRecords}
              selectedRows={selectedRows}
              errors={errors}
              setErrors={setErrors}
            />

            <ConfirmationModal
              isOpen={
                openForm?.isDialogOpen && openForm?.divType === "deleteDialog"
              }
              onDismissModal={resetForm}
              title={recordId?.length > 1 ? "Delete Roles" : "Delete Role"}
              content={`Are you sure you want to delete selected ${
                recordId?.length > 1 ? "Roles" : "Role"
              }?`}
              Button={"Delete"}
              onClick={() => handleDeleteRecord(openForm?.rowDetails)}
            />
          </FluentProvider>
        </div>
      </div>
    </>
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
export default withTranslation("translations")(
  connect(mapStateToProps, mapDispachToProps)(Roles),
);
