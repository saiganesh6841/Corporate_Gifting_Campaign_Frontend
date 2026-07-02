import { useEffect, useState } from "react";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import LocalStorage from "../../../../../config/LocalStorage";
import useAlert from "../../../../../hooks/useAlert";
import APIRequest from "../../../../../utils/APIRequest";
// import APIRequestDataTableQuery from "../../../../../utils/APIRequestDataTableQuery";
import fieldsValidation from "../../../../../utils/FieldsValidation";
import Validation from "../../../../../utils/Validation";
import { store } from "../../../../../main";
import useUploadExcel from "../../../../../hooks/useUploadExcel";

const required = {
  campaignName: "",
  budgetPerEmployee: null,
  deliveryWindowStart: null,
  deliveryWindowEnd: null,
  campaignDeadline: null,
  occasion: "",
  giftingModel: "", //employee_choice
  // message: "",
  // products: [],
  // employeeFile: "",
  organizationId: "",
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
  const [productData, setProductData] = useState({
    result: null,
    pages: 0,
    filterRecords: 0,
  });

  const [loading, setLoading] = useState({
    isOpen: false,
    message: "",
  });
  //bulk upload
  const [bulkUploadResult, setBulkUploadResult] = useState([]);
  const {
    handleDownloadTemplate,
    handleReadExcelSheet,
    handleDownloadExcelFailedData,
    validateHeaders,
    handleChangeKeys,
  } = useUploadExcel();

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
          ConfigAPIURL.listCampaigns,
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
      ? ConfigAPIURL.editCampaign
      : ConfigAPIURL.createCampaign;

    let validationFields = { ...required };
    if (userForm?.giftingModel === "employee_choice") {
      validationFields.emailTextInformation =
        "Email text information is required";
    }
    const validationErrors = fieldsValidation(userForm, validationFields); //userForm, requiredFields

    if (validationErrors !== true) {
      setErrors(validationErrors);
      return;
    }
    console.log("userForm", errors, userForm);
    let payload = isEdit
      ? {
          ...userForm,
          _id: recordId[0]?._id,
        }
      : { ...userForm };

    // convert File to base64 string so it can go inside JSON
    if (userForm?.employeeFile instanceof File) {
      const base64 = await convertFileToBase64(userForm.employeeFile);
      payload = {
        ...payload,
        employeeFile: base64, // base64 string
        employeeFileName: userForm.employeeFileName, // keep filename for backend
        // productIds needs to be array of _ids only, not full product objects
        productIds: (userForm.products || []).map((p) => p._id),
      };
    }

    // remove the raw File object and full product objects — not needed in payload
    delete payload.products;
    delete payload.isProductModalOpen;
    // delete payload.organizationId;
    try {
      setLoading({ ...loading, isOpen: true });
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        method,
        URL,
        JSON.stringify(payload),
      );

      if (response?.data?.responseCode === 109) {
        publishNotification(
          `User ${isEdit ? "updated" : "created"} successfully`,
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
        setLoading({ ...loading, isOpen: false });
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
        `${ConfigAPIURL.getCampaign}?_id=${recordId[0]?._id}`,
        // JSON.stringify({
        //   userId: recordId[0]?.userId,
        // }),
      );
      if (response?.data?.responseCode === 109) {
        const result = response?.data?.data;
        setUserForm({
          ...result,
          campaignName: result?.campaignName || "",
          occasion: result?.occasion || "",
          budgetPerEmployee: result?.budgetPerEmployee || "",
          campaignDeadline: result?.campaignDeadline || "",
          deliveryWindowEnd: result?.deliveryWindowEnd || "",
          deliveryWindowStart: result?.deliveryWindowStart || "",
          giftingModel: result?.giftingModel || "",
          products: result?.products || "",
          message: result?.message || "",
        });
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // result is "data:application/...;base64,XXXXXX"
        // strip the prefix, keep only the base64 part
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
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
      userId: ids,
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
        publishNotification("User Deleted Successfully", "success");
      }
    } catch (error) {
      publishNotification("Something went wrong while deleting", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
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

  const getProductList = async (keyword) => {
    try {
      setLoading({ ...loading, isOpen: true });
      APIRequest.request(
        "POST",
        ConfigAPIURL.listProducts,
        JSON.stringify({
          page: 0,
          pageSize: 20,
          active: true,
          userType: "All",
          keyword: keyword,
        }),
      ).then((productData) => {
        setProductData(productData?.data);
        setLoading({ ...loading, isOpen: false });
      });
    } catch (error) {
      publishNotification("Error while fetching product list", "error");
    } finally {
      setLoading({ ...loading, isOpen: false });
    }
  };

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
    getProductList,
    productData,
    handleDownloadTemplate,
    handleReadExcelSheet,
    handleDownloadExcelFailedData,
    validateHeaders,
    handleChangeKeys,
  };
};

export default useServices;
