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
  projectId: "",
  floorNo: "",
  flatNo: "",
  room: "",
  workerId: "",
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
  const [projectList, setProjectList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [listMessages, setListMessages] = useState([]);

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
    projectDropdown();
    projectByTasks();
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
          ConfigAPIURL.listTasks,
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
    const URL = isEdit ? ConfigAPIURL.updateTask : ConfigAPIURL.createTask;
    const validationErrors = fieldsValidation(userForm, required); //userForm, requiredFields

    const customErrors = {};

    const taskErrors = userForm.task?.map((t, index) =>
      !t.taskDescription?.trim() ? "Task description is required" : null
    );

    // Check if any task has an error
    const hasTaskErrors = taskErrors?.some((e) => e !== null);
    if (hasTaskErrors) {
      customErrors.task = taskErrors;
    }

    const hasValidationErrors =
      validationErrors !== true || Object.keys(customErrors).length > 0;

    if (hasValidationErrors) {
      setErrors({
        ...(validationErrors !== true ? validationErrors : {}),
        ...customErrors,
      });
      return;
    }
    // if (validationErrors !== true) {
    //   setErrors(validationErrors);
    //   return;
    // }

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
          `Task ${isEdit ? "updated" : "created"} successfully`,
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
        `Error while ${isEdit ? "updating" : "creating"} task`,
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
        `${ConfigAPIURL.getTask}`,
        JSON.stringify({
          recordId: recordId[0]?._id,
        })
      );
      if (response?.data?.responseCode === 109) {
        const task = response?.data?.task?.[0];
        setUserForm({
          taskId: task?.taskId,
          projectId: task?.projectId,
          projectName: task?.projectName,
          floorNo: task?.floorId,
          floor: task?.floor,
          flatNo: task?.flatId,
          flat: task?.flat,
          roomName: task?.room,
          workerId: task?.workerId,
          room: task?.roomId,
          worker: task?.worker,
          taskDescription: task?.taskDescription,
        });
      }
    } catch (error) {
      publishNotification("Error while fetching task details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const getViewTable = async ({ setUserForm }) => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.taskView}`,
        JSON.stringify({
          recordId: recordId[0]?._id,
        })
      );
      if (response?.data?.responseCode === 109) {
        const task = response?.data?.task?.[0];
        setUserForm({
          taskId: task?.taskId,
          projectId: task?.projectId,
          projectName: task?.projectName,
          floorNo: task?.floorId,
          floor: task?.floor,
          flatNo: task?.flatId,
          flat: task?.flat,
          roomName: task?.roomName,
          workerId: task?.workerId,
          room: task?.roomId,
          worker: task?.workerName,
          workerImage: task?.workerImage,
          taskDescription: task?.taskDescription,
          images: task?.images,
          entryId: task?.entryId,
          createdAt: task?.createdAt,
          createdByName: task?.createdByName,
          createdImage: task?.createdImage,
          createdUserType: task?.createdUserType,
        });
      }
    } catch (error) {
      publishNotification("Error while fetching task details", "error");
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
        publishNotification("Task Deleted Successfully", "success");
      }
    } catch (error) {
      publishNotification("Something went wrong while deleting", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const projectByTasks = async (keyword) => {
    try {
      setLoading({ ...loading, isOpen: true, type: "filter" });

      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.taskProjectDropdown,
        JSON.stringify({ keyword: keyword ?? "" })
      );
      if (response?.data?.responseCode === 109) {
        console.log("createdByList", response?.data?.result);
        setCreatedByList(response?.data?.result);
      }
    } catch (error) {
      publishNotification("Error while fetching Created By task list", "error");
    } finally {
      setLoading({ ...loading, isOpen: false, type: "" });
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

  const projectDropdown = () =>
    fetchDropdownData(ConfigAPIURL.projectDropdown, setProjectList);

  // Pass projectId for floorDropdown
  const floorsDropdown = (projectId) =>
    fetchDropdownData(ConfigAPIURL.floorsDropdown, setFloorList, { projectId });

  // Pass projectId and floorId for flatDropdown
  const flatDropdown = (projectId, floorId) =>
    fetchDropdownData(ConfigAPIURL.flatDropdown, setFlatList, {
      projectId,
      floorId,
    });

  // Pass projectId, floorId, flatId for roomDropdown
  const roomDropdown = (projectId, floorId, flatId) =>
    fetchDropdownData(ConfigAPIURL.roomDropdown, setRoomList, {
      projectId,
      floorId,
      flatId,
    });

  // Pass only projectId for workerDropdown
  const workerDropdown = (projectId) =>
    fetchDropdownData(ConfigAPIURL.workersDropdown, setWorkerList, {
      projectId,
    });

  const messagesList = async (entryId) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.taskLisMessages,
        JSON.stringify({ entryId: entryId })
      );
      if (response?.data?.responseCode === 109) {
        setListMessages(response?.data?.messages);
      }
    } catch (error) {
      console.log(error);
      publishNotification("Error while fetching data", "error");
    }
  };

  const addMessage = async (entryId, message) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.addMessage,
        JSON.stringify({ entryId: entryId, message })
      );
      if (response?.data?.responseCode === 109) {
        await messagesList(entryId);
      }
    } catch (error) {
      console.log(error);
      publishNotification("Error while fetching data", "error");
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
    projectList,
    projectDropdown,
    floorList,
    flatList,
    workerList,
    roomList,
    workerDropdown,
    roomDropdown,
    flatDropdown,
    floorsDropdown,
    getViewTable,
    addMessage,
    messagesList,
    listMessages,
    projectByTasks,
  };
};

export default useServices;
