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
  const [progressData, setProgressData] = useState({
    pages: null,
    rows: [],
    filterRecords: 0,
  });
  const [projectList, setProjectList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [workerList, setWorkerList] = useState([]);

  const [tableData, setTableData] = useState({
    result: null,
    pages: 0,
    filterRecords: 0,
    createdOn: null,
  });

  const [loading, setLoading] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    projectDropdown();
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

  const getEditTable = async ({ userForm }) => {
    try {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: true });
      const response = await APIRequest.request(
        "POST",
        `${ConfigAPIURL.getProgressTimeline}`,
        JSON.stringify({
          roomId: userForm?.room,
          flatId: userForm?.flatNo,
          startDate: userForm?.startDate ?? "",
          endDate: userForm?.endDate ?? "",
          page: userForm?.page ?? 1,
          pageSize: 10,
        })
      );
      if (response?.data?.responseCode === 109) {
        setProgressData((p) => ({
          pages: response?.data?.pages,
          filterRecords: response?.data?.filterRecords,
          createdOn: response?.data?.createdOn,
          rows:
            query?.page === 0
              ? [...(response?.data?.progressTimeLine || [])]
              : [...(p?.rows || []), ...response?.data?.progressTimeLine],
        }));
      }
    } catch (error) {
      publishNotification("Error while fetching user details", "error");
    } finally {
      store.dispatch({ type: "IS_BACKDROP_OPEN", value: false });
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

  return {
    tableData,
    setTableData,
    getEditTable,
    loading,
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
    progressData,
  };
};

export default useServices;
