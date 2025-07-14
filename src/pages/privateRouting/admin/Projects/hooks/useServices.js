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
  const [roomImageDetailsData, setRoomImageDetailsData] = useState([]);
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

  const [data, setData] = useState({
    floor: "",
    floorId: "",
    flatId: "",
    flat: "",
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
          // details: userForm?.details?.map((floor) => ({
          //   floorNo: floor.floorNo,
          //   floorId: floor.floorId || floor.floor_id,
          //   roomDetails: floor.roomDetails?.map((flat) => ({
          //     flatNo: flat.flatNo,
          //     flat_id: flat.flat_id,
          //     rooms: flat.rooms?.map((room) => room?.roomDetails?._id),
          //   })),
          // })),
          details: userForm?.details?.map((floor) => ({
            floorNo: floor.floorNo,
            floorId: floor.floorId || floor.floor_id,
            roomDetails: floor.roomDetails?.map((flat) => ({
              flatNo: flat.flatNo,
              flat_id: flat.flat_id,
              rooms: flat.rooms
                ?.map(
                  (room) =>
                    typeof room === "string"
                      ? room // new room added
                      : room?.roomDetails?._id // existing room from DB
                )
                .filter(Boolean), // ✅ removes null, undefined, false, 0, ''
            })),
          })),
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
          `Project ${isEdit ? "updated" : "created"} successfully`,
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
        `Error while ${isEdit ? "updating" : "creating"} Project`,
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
        console.log(project, "userForm");
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
          recordId: project?.proId,
          //
          // assignedSupervisor: project?.assignedSupervisor,
          // assignedWorkers: project?.assignedWorkers,
          uploadImage: project?.uploadImage,
          supervisorName: project?.supervisorName,
          supervisorMobile: project?.supervisorMobile,
          supervisorImage: project?.supervisorImage,
          status: project?.status,
        });
      }
    } catch (error) {
      publishNotification("Error while fetching project details", "error");
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
          recordId: openForm?.recordId,
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
      publishNotification("Error while fetching project details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
    }
  };

  const deleteUser = async () => {
    const ids = recordId?.map((id) => id?._id);
    const payload = {
      projectIds: ids,
    };

    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteProject,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        tableQuery(query);
        dismissDelete();
        resetRecords();
        publishNotification("Project Deleted Successfully", "success");
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
        JSON.stringify({ recordId: openForm?.recordId, ...query })
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

  const fetchFloorDropdownData = async (url, setState, payload = {}) => {
    try {
      const response = await APIRequest.request(
        "POST",
        url,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        setState(response.data?.result);
        setData((prev) => {
          const updated = {
            ...prev,
            floorId: response?.data?.result[0]?._id,
            floor: response?.data?.result[0]?.floor,
          };
          return updated;
        });
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const fetchFlatDropdownData = async (url, setState, payload = {}) => {
    try {
      const response = await APIRequest.request(
        "POST",
        url,
        JSON.stringify(payload)
      );
      if (response?.data?.responseCode === 109) {
        setState(response.data?.result);
        setData((prev) => {
          const updated = {
            ...prev,
            flatId: response?.data?.result[0]?._id,
            flat: response?.data?.result[0]?.flat,
          };
          return updated;
        });
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  // Pass projectId for floorDropdown
  const floorsDropdown = async () =>
    await fetchFloorDropdownData(ConfigAPIURL.floorsDropdown, setFloorList, {
      projectId: openForm?.recordId,
    });

  // Pass projectId and floorId for flatDropdown
  const flatDropdown = async (floorId) =>
    await fetchFlatDropdownData(ConfigAPIURL.flatDropdown, setFlatList, {
      projectId: openForm?.recordId,
      floorId,
    });

  // Pass projectId, floorId, flatId for roomDropdown
  const roomDropdown = (floorId, flatId) =>
    fetchDropdownData(ConfigAPIURL.roomDropdown, setRoomData, {
      projectId: openForm?.recordId,
      floorId,
      flatId,
    });

  const viewRoomImageData = (flatId, roomId, date) =>
    fetchDropdownData(ConfigAPIURL.viewRoomImages, setViewRoomData, {
      flatId,
      roomId,
      date,
    });
  const roomImageDetails = (entryId) =>
    fetchDropdownData(ConfigAPIURL.roomImageDetails, setRoomImageDetailsData, {
      entryId,
    });

  const deleteRoomImage = async (entryId, imageUrl) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteImage,
        JSON.stringify({ entryId: entryId, imageUrl })
      );
      if (response?.data?.responseCode === 109) {
        roomImageDetails(entryId);
      }
    } catch (error) {
      console.log(error);
      publishNotification("Error while fetching data", "error");
    }
  };

  const messagesList = async (entryId) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.listMessages,
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

  const deleteFlat = async (projectId, flatId) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteFlat,
        JSON.stringify({ projectId: projectId, flatId: flatId })
      );
      if (response?.data?.responseCode === 109) {
        console.log(response?.data);
        publishNotification("Flat deleted successfully", "success");
      }
    } catch (error) {
      console.log(error);
      publishNotification("Error while fetching data", "error");
    }
  };

  const deleteFloor = async (projectId, floorId) => {
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.deleteFloor,
        JSON.stringify({ projectId: projectId, floorId: floorId })
      );
      if (response?.data?.responseCode === 109) {
        console.log(response?.data);
        publishNotification("Flat deleted successfully", "success");
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
    roomImageDetails,
    roomImageDetailsData,
    setRoomImageDetailsData,
    deleteRoomImage,
    messagesList,
    listMessages,
    addMessage,
    deleteFloor,
    deleteFlat,
    data,
    setData,
  };
};

export default useServices;
