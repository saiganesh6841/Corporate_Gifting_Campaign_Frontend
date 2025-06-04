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
  projectName: "",
  location: "",
  clientName: "",
  companyName: "",
  mobileNumber: "",
  email: "",
  startDate: "",
  endDate: "",
  uploadImage: "",
  assignedSupervisor: "",
  assignedWorkers: [],
};

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
  const [roomList, setRoomList] = useState([]);
  const [superVisorList, setSuperVisorList] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [workerData, setWorkerData] = useState(null);
  const [floorList, setFloorList] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [viewRoomData, setViewRoomData] = useState([]);

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
    fetchRoomList();
    fetchSuperVisorList();
    fetchWorkerList();
  }, []);

  useEffect(() => {
    if (!query) return;
    tableQuery(query);
  }, [query, LocalStorage?.adminButtonPermission]);

  useEffect(() => {
    // if (!query) return;
    if (openForm?.divType === "view") {
      workerTable(query);
    }
  }, [query, openForm]);

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
          ConfigAPIURL.listProjects,
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
    const URL = isEdit
      ? ConfigAPIURL.updateProject
      : ConfigAPIURL.createProject;
    console.log(userForm?.assignedWorkers?.length < 1, "error");
    const validationErrors = fieldsValidation(userForm, required); //userForm, requiredFields
    if (userForm?.mobileNumber?.length < 10) {
      errors["mobileNumber"] = "Mobile number must be at least 10 characters";
      // return;
    }
    if (userForm?.assignedWorkers?.length < 1) {
      setErrors((prev) => ({
        ...prev,
        assignedWorkers: "Assigned Worker is required",
      }));
      // return;
    }
    if (validationErrors !== true) {
      setErrors(validationErrors);
      return;
    }

    const payload = isEdit
      ? {
          ...userForm,
          recordId: recordId[0]?._id,
        }
      : { ...userForm };

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
        `${ConfigAPIURL.getProject}`,
        JSON.stringify({
          recordId: recordId[0]?._id,
        })
      );
      if (response?.data?.responseCode === 109) {
        const project = response?.data?.project?.[0];
        setUserForm({
          projectId: project?.projectId,
          projectName: project?.projectName,
          clientName: project?.clientName,
          location: project?.location,
          companyName: project?.companyName,
          startDate: project?.startDate,
          endDate: project?.endDate,
          mobileNumber: project?.clientPhoneNo,
          email: project?.clientEmail,
          assignedSupervisor: project?.assignedSupervisor,
          assignedWorkers: project?.assignedWorkers,
          details: project?.floorDetails,
        });
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const getViewTable = async ({ setUserForm }) => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.projectView}`,
        JSON.stringify({
          recordId: recordId[0]?._id,
        })
      );
      if (response?.data?.responseCode === 109) {
        const project = response?.data?.project?.[0];
        setUserForm({
          projectId: project?.projectId,
          projectName: project?.projectName,
          clientName: project?.clientName,
          location: project?.location,
          companyName: project?.companyName,
          startDate: project?.startDate,
          endDate: project?.endDate,
          mobileNumber: project?.clientPhoneNo,
          email: project?.clientEmail,
          assignedSupervisor: project?.assignedSupervisor,
          assignedWorkers: project?.assignedWorkers,
          uploadImage: project?.uploadImage,
          supervisorName: project?.supervisorName,
          supervisorMobile: project?.supervisorMobile,
          supervisorImage: project?.supervisorImage,
          status: project?.status,
        });
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const deleteUser = async () => {
    const ids = recordId?.map((id) => id?._id);
    const payload = {
      taskIds: ids,
    };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteTask,
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

  const fetchRoomList = async (keyword) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.roomsProjectDropdown,
        JSON.stringify({ keyword: keyword ?? "" })
      );
      if (response?.data?.responseCode === 109) {
        setRoomList(response.data?.room);
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const fetchSuperVisorList = async (keyword) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.superVisor,
        JSON.stringify({ keyword: keyword ?? "" })
      );
      if (response?.data?.responseCode === 109) {
        setSuperVisorList(response.data?.supervisor);
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const fetchWorkerList = async (keyword) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.workerList,
        JSON.stringify({ keyword: keyword ?? "" })
      );
      if (response?.data?.responseCode === 109) {
        setWorkerList(response.data?.worker);
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const workerTable = async (query) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.ProjectTable,
        JSON.stringify({ recordId: recordId[0]?._id, ...query })
      );
      if (response?.data?.responseCode === 109) {
        setWorkerData(response.data);
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const fetchDropdownData = async (url, setState, payload = {}) => {
    try {
      const response = await APIRequest.request(
        "POST",
        url,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        setState(response.data?.result);
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  // Pass projectId for floorDropdown
  const floorsDropdown = () =>
    fetchDropdownData(ConfigAPIURL.floorsDropdown, setFloorList, {
      projectId: recordId[0]?._id,
    });

  // Pass projectId and floorId for flatDropdown
  const flatDropdown = (floorId) =>
    fetchDropdownData(ConfigAPIURL.flatDropdown, setFlatList, {
      projectId: recordId[0]?._id,
      floorId,
    });

  // Pass projectId, floorId, flatId for roomDropdown
  const roomDropdown = (floorId, flatId) =>
    fetchDropdownData(ConfigAPIURL.roomDropdown, setRoomData, {
      projectId: recordId[0]?._id,
      floorId,
      flatId,
    });

  const viewRoomImageData = (flatId, roomId, date) =>
    fetchDropdownData(ConfigAPIURL.viewRoomImages, setViewRoomData, {
      flatId,
      roomId,
      date,
    });
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
    roomList,
    getViewTable,
    fetchRoomList,
    superVisorList,
    fetchSuperVisorList,
    fetchWorkerList,
    workerList,
    workerData,
    workerTable,
    floorsDropdown,
    flatDropdown,
    roomDropdown,
    roomData,
    floorList,
    flatList,
    setRoomData,
    viewRoomData,
    viewRoomImageData,
  };
};

export default useServices;
