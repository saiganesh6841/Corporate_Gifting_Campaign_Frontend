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

const customerRequiredDetails = {
  userType: "",
  fullName: "",
  email: "",
  mobileNumber: "",
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

  const [roles, setRoles] = useState([]);
  const [createdByList, setCreatedByList] = useState([]);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [challengeDropdownList, setChallengeDropdownList] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [userSubscriptionDetails, setuserSubscriptionDetails] = useState({
    currentSubscription: null,
    historySubscription: null,
  });
  const [tableData, setTableData] = useState({
    result: null,
    pages: 0,
    filterRecords: 0,
  });

  const [loading, setLoading] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    createdByUsers();
  }, []);

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
          ConfigAPIURL.getAllUsers,
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

    let validationFields = {};

    if (userForm?.userType === "worker") {
      validationFields = { ...customerRequiredDetails };
    } else {
      validationFields = { ...required };
    }

    const validationErrors = fieldsValidation(userForm, validationFields); //userForm, requiredFields

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
    console.log(recordId[0], "data");
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.getUserDetails}`,
        JSON.stringify({
          userId: recordId[0]?.userId,
        })
      );
      if (response?.data?.responseCode === 109) {
        const user = response?.data?.rows;
        setUserForm({
          userId: user?.userId || "",
          userType: user?.userType || "",
          userName: user?.userName || "",
          fname: user?.fname || "",
          lname: user?.lname || "",
          email: user?.email || "",
          mobileNumber: user?.mobileNumber || "",
          permission: user?.permission?._id || "",
          permissionName: user?.permission?.name || "",
          password: user?.password || "",
          gender: user?.gender || "",
          profileImage: user?.profileImage,
          dob: user?.dob || null,
          isSuperAdmin: user?.isSuperAdmin || false,
          fullName: user?.fullName || "",
        });
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const getAllSubscription = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getAllSubcriptionsForRenewal,
      ""
    );
    if (response?.data?.responseCode === 109) {
      setSubscriptionList(response?.data?.rows);
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

  const restoreUser = async () => {
    const ids = recordId?.map((id) => id?._id);
    const payload = {
      userId: ids,
    };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.restoreUser,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        tableQuery(query);
        dismissRestore();
        resetRecords();
        publishNotification("User Restored Successfully", "success");
      }
    } catch (error) {
      publishNotification("Something went wrong while restoring", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const fetchRoles = async (keyword) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.listRoles,
        JSON.stringify({ active: true, keyword: keyword ?? "" })
      );
      if (response?.data?.responseCode === 109) {
        setRoles(response?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPasswordAttempts = async () => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.userUpdate,
        JSON.stringify({
          passwordAttempt: 0,
          _id: recordId[0]?._id,
          userId: recordId[0]?.userId,
        })
      );

      if (response?.data?.responseCode === 109) {
        publishNotification("Password Attempts reset successful", "success");
      }
    } catch (error) {
      publishNotification("Error while resetting password", "error");
      console.log("Error while resetting password", error);
    }
  };

  const createdByUsers = async () => {
    try {
      setLoading({ ...loading, isOpen: true, type: "filter" });

      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.userCreatedByList,
        ""
      );
      if (response?.data?.responseCode === 109) {
        setCreatedByList(response.data?.result);
      }
    } catch (error) {
      publishNotification(
        "Error while fetching Created By users list",
        "error"
      );
    } finally {
      setLoading({ ...loading, isOpen: false, type: "" });
    }
  };

  const getDropdownChallenges = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getDropdownChallenges,
      ""
    );

    if (response?.data?.responseCode === 109) {
      setChallengeDropdownList(response.data.challenges);
    }
  };

  return {
    tableData,
    setTableData,
    getEditTable,
    loading,
    sendToServer,
    deleteUser,
    roles,
    setRoles,
    fetchRoles,
    errors,
    setErrors,
    resetPasswordAttempts,
    userRatings,
    restoreUser,
    createdByList,
    getAllSubscription,
    subscriptionList,
    getDropdownChallenges,
    challengeDropdownList,
    userSubscriptionDetails,
  };
};

export default useServices;
