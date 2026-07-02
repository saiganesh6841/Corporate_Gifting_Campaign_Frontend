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
  price: null,
  stockQuantity: null,
  description: "",
  category: "",
  brand: "",
  thumbnailImage: "",
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
          ConfigAPIURL.listProducts,
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
    const URL = isEdit ? ConfigAPIURL.editProduct : ConfigAPIURL.createProduct;

    let validationFields = {};

    validationFields = { ...required };

    const validationErrors = fieldsValidation(userForm, validationFields); //userForm, requiredFields
    console.log(validationErrors, "validationErrors");
    if (validationErrors !== true) {
      setErrors(validationErrors);
      return;
    }

    const payload = isEdit
      ? {
          ...userForm,
          _id: recordId[0]?._id,
        }
      : { ...userForm };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        method,
        URL,
        JSON.stringify(payload),
      );

      if (response?.data?.responseCode === 109) {
        publishNotification(
          `Product ${isEdit ? "updated" : "created"} successfully`,
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
        `${ConfigAPIURL.getProduct}?_id=${recordId[0]?._id}`,
        // JSON.stringify({
        //   userId: recordId[0]?.userId,
        // }),
      );
      if (response?.data?.responseCode === 109) {
        const result = response?.data?.data;
        setUserForm({
          name: result?.name || "",
          description: result?.description || "",
          price: result?.price || null,
          stockQuantity: result?.stockQuantity || null,
          category: result?.category || "",
          brand: result?.brand || "",
          thumbnailImage: result?.thumbnailImage || "",
        });
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
  };
};

export default useServices;
