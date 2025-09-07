import { useEffect, useState } from "react";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import LocalStorage from "../../../../../config/LocalStorage";
import useAlert from "../../../../../hooks/useAlert";
import APIRequest from "../../../../../utils/APIRequest";
// import APIRequestDataTableQuery from "../../../../../utils/APIRequestDataTableQuery";
import fieldsValidation from "../../../../../utils/FieldsValidation";
import Validation from "../../../../../utils/Validation";
import { store } from "../../../../../main";

const required = {
  userType: "",
  fullName: "",
  email: "",
  mobileNumber: "",
  password: "",
  permission: "",
};

// this is api calls happen
const useServices = (props) => {
  const {
    query,
    recordId,
    dismissDelete,
    openForm,
    setOpenForm,
    resetRecords,
    dismissRestore,
    errors,
    setErrors,
    resetForm,
  } = props;

  const { publishNotification } = useAlert();
  const [createdByList, setCreatedByList] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [tableData, setTableData] = useState({
    result: null,
    pages: 0,
    filterRecords: 0,
  });

  const [loading, setLoading] = useState({
    isOpen: false,
    message: "",
  });

  // useEffect(() => {
  //   createdByUsers();
  // }, []);

  useEffect(() => {
    if (!query) return;
    tableQuery(query);
  }, [query, LocalStorage?.adminButtonPermission]);

  const tableQuery = (query) => {
    try {
      setLoading({ ...loading, isOpen: true });
      if (
        LocalStorage.adminButtonPermission.find(function (element) {
          return element.button === "query" ? true : false;
        })
      ) {
        APIRequest.request(
          "POST",
          ConfigAPIURL.listAttendance,
          JSON.stringify(query)
        ).then((tableData) => {
          setTableData(tableData?.data);
          setLoading({ ...loading, isOpen: false });
        });
      } else {
        // notification(props.t('toaster.tableRecordPermission'), 'error');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendToServer = async (userForm, isEdit) => {
    const method = isEdit ? "POST" : "POST";
    const URL = isEdit ? ConfigAPIURL.userUpdate : ConfigAPIURL.createUser;
    const validationErrors = fieldsValidation(userForm, required); //userForm, requiredFields

    if (userForm?.email) {
      const isValid = Validation.emailValidation(userForm?.email);
      if (!isValid) {
        errors["email"] = "Please enter valid email address";
        return;
      }
    }

    if (userForm?.mobileNo?.length < 10) {
      errors["mobileNo"] = "Mobile number must be at least 10 characters";
      return;
    }

    if (validationErrors !== true) {
      setErrors(validationErrors);
      return;
    }

    const payload = isEdit
      ? {
          ...userForm,
          _id: recordId[0]?._id,
          permission: userForm?.permission ? userForm?.permission : null,
          email: userForm?.email?.toLowerCase(),
        }
      : { ...userForm, email: userForm?.email?.toLowerCase() };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        method,
        URL,
        JSON.stringify(payload)
      );

      if (response?.data?.responseCode === 109) {
        publishNotification(
          `User ${isEdit ? "updated" : "created"} successfully`,
          "success"
        );
        resetForm();
        tableQuery(query);
      }
      if (response?.data?.responseCode === 114) {
        if (response?.data?.message === "Mobile number already exists.") {
          setErrors((p) => ({
            ...p,
            mobileNo: "Mobile number already exists",
          }));
        } else if (response?.data?.message === "Email already exists.") {
          setErrors((p) => ({ ...p, email: "Email already exists" }));
        }
      }
    } catch (error) {
      publishNotification(
        `Error while ${isEdit ? "updating" : "creating"} user`,
        "error"
      );
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const getEditTable = async ({ setUserForm }) => {
    console.log(recordId, "recordId");
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.attendanceDetails}`,
        JSON.stringify({
          userId: recordId[0]?.userObjectId || openForm?.recordId,
          date: openForm?.date,
        })
      );
      if (response?.data?.responseCode === 109) {
        console.log(response?.data, "data");
        setAttendanceData(response?.data);
        setUserForm({});
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const deleteUser = async () => {
    const ids = recordId?.map((id) => id?.userId);
    const payload = {
      userId: ids,
    };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteUser,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        tableQuery(query);
        dismissDelete();
        resetRecords();
        publishNotification("User Deleted Successfully", "success");
      }
    } catch (error) {
      publishNotification("Something went wrong while deleting", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  // const createdByUsers = async () => {
  //   try {
  //     setLoading({ ...loading, isOpen: true, type: "filter" });

  //     const response = await APIRequest.request(
  //       "POST",
  //       ConfigAPIURL.userCreatedByList,
  //       ""
  //     );
  //     if (response?.data?.responseCode === 109) {
  //       setCreatedByList(response.data?.result);
  //     }
  //   } catch (error) {
  //     publishNotification(
  //       "Error while fetching Created By users list",
  //       "error"
  //     );
  //   } finally {
  //     setLoading({ ...loading, isOpen: false, type: "" });
  //   }
  // };

  return {
    tableData,
    setTableData,
    getEditTable,
    loading,
    sendToServer,
    deleteUser,
    errors,
    setErrors,
    createdByList,
    attendanceData,
  };
};

export default useServices;
