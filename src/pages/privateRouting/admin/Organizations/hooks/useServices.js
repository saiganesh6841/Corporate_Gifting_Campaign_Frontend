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
  name: "",
  email: "",
  mobileNumber: "",
  state: "",
  city: "",
  address: "",
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
          ConfigAPIURL.listOrganizations,
          JSON.stringify(query),
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
    // publishNotification("hello we are checking", "error");
    // return;
    const method = isEdit ? "POST" : "POST";
    const URL = isEdit
      ? ConfigAPIURL.editOrganization
      : ConfigAPIURL.createOrganization;

    let validationFields = {};

    validationFields = { ...required };

    const validationErrors = fieldsValidation(userForm, validationFields); //userForm, requiredFields

    if (userForm?.email) {
      const isValid = Validation.emailValidation(userForm?.email);
      if (!isValid) {
        errors["email"] = "Please enter valid email address";
        return;
      }
    }

    if (userForm?.mobileNumber?.length < 10) {
      errors["mobileNumber"] = "Mobile number must be at least 10 characters";
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
        JSON.stringify(payload),
      );

      if (response?.data?.responseCode === 109) {
        publishNotification(
          `Organization ${isEdit ? "updated" : "created"} successfully`,
          "success",
        );
        resetForm();
        tableQuery(query);
      }
      if (response?.data?.responseCode === 114) {
        if (response?.data?.message === "Mobile number already exists.") {
          setErrors((p) => ({
            ...p,
            mobileNumber: "Mobile number already exists",
          }));
        } else if (response?.data?.message === "Email already exists.") {
          setErrors((p) => ({ ...p, email: "Email already exists" }));
        }
      }
    } catch (error) {
      publishNotification(
        `Error while ${isEdit ? "updating" : "creating"} user`,
        "error",
      );
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const getEditTable = async ({ setUserForm }) => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "GET",
        `${ConfigAPIURL.getOrganization}?_id=${recordId[0]?._id}`,
        // JSON.stringify({
        //   userId: recordId[0]?.userId,
        // }),
      );
      if (response?.data?.responseCode === 109) {
        const result = response?.data?.data;
        setUserForm({
          name: result?.name || "",
          email: result?.email || "",
          mobileNumber: result?.mobileNumber || "",
          logo: result?.logo,
          contactPersonName: result?.contactPersonName || "",
          gstNumber: result?.gstNumber || "",
          address: result?.address || "",
          city: result?.city || "",
          state: result?.state || "",
          pincode: result?.pincode || "",
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
      "",
    );
    if (response?.data?.responseCode === 109) {
      setSubscriptionList(response?.data?.rows);
    }
  };

  const deleteUser = async () => {
    const ids = recordId?.map((id) => id?.userId);
    const payload = {
      orgIds: ids,
    };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteUser,
        JSON.stringify(payload),
      );
      if (response?.data?.responseCode === 109) {
        tableQuery(query);
        dismissDelete();
        resetRecords();
        publishNotification("Organization Deleted Successfully", "success");
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
        JSON.stringify(payload),
      );
      if (response?.data?.responseCode === 109) {
        tableQuery(query);
        dismissRestore();
        resetRecords();
        publishNotification("Organization Restored Successfully", "success");
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
        JSON.stringify({ active: true, keyword: keyword ?? "" }),
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
        }),
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
        "",
      );
      if (response?.data?.responseCode === 109) {
        setCreatedByList(response.data?.result);
      }
    } catch (error) {
      publishNotification(
        "Error while fetching Created By users list",
        "error",
      );
    } finally {
      setLoading({ ...loading, isOpen: false, type: "" });
    }
  };

  const getDropdownChallenges = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getDropdownChallenges,
      "",
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
