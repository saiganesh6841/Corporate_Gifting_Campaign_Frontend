import React, { useState } from "react";
import { useEffect } from "react";
import LocalStorage from "../../../../../config/LocalStorage";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import APIRequest from "../../../../../utils/APIRequest";
import useAlert from "../../../../../hooks/useAlert";
import { store } from "../../../../..";

// this is api calls happen
const useServices = (props) => {
  const {
    openForm,
    setOpenForm,
    query,
    resetForm,
    resetRecords,
    resetAddForm,
    addForm,
    recordId,
    assigned,
  } = props;

  const { publishNotification } = useAlert();
  const [tableData, setTableData] = useState({
    rows: null,
    pages: 0,
    filterRecords: 0,
  });
  const [loading, setLoading] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!query) return;
    tableQuery(query);
  }, [query, LocalStorage.adminButtonPermission]);

  const tableQuery = (query) => {
    try {
      setLoading({ ...loading, isOpen: true, type: "query" });
      if (
        LocalStorage.adminButtonPermission.find(function (element) {
          return element.button === "query" ? true : false;
        })
      ) {
        APIRequest.request(
          "POST",
          ConfigAPIURL.fetchAllRoles,
          JSON.stringify(query)
        ).then((tableData) => {
          console.log(tableData);
          setTableData(tableData?.data);
          setLoading({ ...loading, isOpen: false, type: "" });
        });
      } else {
        // notification(props.t('toaster.tableRecordPermission'), 'error');
      }
    } catch (err) {
      publishNotification("Something went wrong ", "error");

      console.log(err);
    } finally {
    }
  };

  const [addRoleObject, setAddRoleObject] = React.useState({
    name: "",
    active: true,
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors("");
    setAddRoleObject({
      name: "",
      active: true,
    });
  };

  const resetRoleObject = () => {
    const { openForm, setOpenForm } = props;
    setAddRoleObject({ name: "", active: true });
    setOpenForm({ ...openForm, isOpen: false });
  };

  const addRole = () => {
    if (!addRoleObject?.name) {
      setErrors("Role Name field is required");
      return;
    }

    APIRequest.request(
      "POST",
      ConfigAPIURL.roleCreate,
      JSON.stringify(addRoleObject)
    ).then((response) => {
      if (response.data.responseCode === 109) {
        resetRoleObject();
        tableQuery(query);
        handleClose();
        publishNotification("Role created successfully", "success");
        setErrors("");
      } else {
        publishNotification("Something went wrong", "error");
      }
    });
  };

  const handleDeleteRecord = async (recordId) => {
    const recordIds = recordId?.map((user) => user?._id);
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteRole,
        JSON.stringify({ recordIds })
      );
      if (response?.data?.responseCode === 109) {
        // successfully deleted the record
        publishNotification("Successfully deleted the role", "success");
        tableQuery(props?.query);
        props?.resetForm();
        props?.resetRecords();
      }
    } catch (err) {
      publishNotification("Something went wrong ", "error");
    }
  };

  const updateRole = async () => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "PUT",
        ConfigAPIURL.roleUpdate,
        JSON.stringify({
          roleId: recordId[0]?._id,
          name: addForm.name,
          active: addForm.active,
          permission: addForm.permission,
          microPermission: addForm.microPermission,
        })
      );

      if (response?.data?.responseCode === 109) {
        publishNotification("Role Updated Successfully", "success");
        tableQuery(query);
        resetRecords();
        resetAddForm();
      }
      setOpenForm({ ...openForm, isOpen: false });
      tableQuery(query);
      if (response.code === 100 && response.data.responseCode === 114) {
        publishNotification("Duplicate Role", "error");
      }
    } catch (e) {
      publishNotification("Something went wrong, while updating role", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const assignRole = async () => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "PUT",
        ConfigAPIURL.roleGrant,
        JSON.stringify({ roleId: recordId[0]?._id, assign: assigned })
      );

      if (response?.data?.responseCode === 109) {
        resetRecords();
        tableQuery(query);
        publishNotification("Role Assigned Successfully", "success");
      }
      setOpenForm({ ...openForm, isOpen: false });
      tableQuery(query);
      if (response.code === 100 && response.data.responseCode === 114) {
        publishNotification("Duplicate Role", "error");
      }
    } catch (e) {
      publishNotification("Something went wrong, while updating role", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  return {
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
    setLoading,
    tableQuery,
    handleDeleteRecord,
    updateRole,
    assignRole,
    errors,
    setErrors,
  };
};

export default useServices;
