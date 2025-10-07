import React, { useEffect, useState } from "react";
import { taskDetails } from "../constants/constant";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import APIRequest from "../../../../../utils/APIRequest";

const useAevForm = ({ openForm, services = {} }) => {
  const [userForm, setUserForm] = useState(taskDetails);

  useEffect(() => {
    // gettting details of row
    if (userForm?.flatNo || userForm?.room || userForm?.projectId)
      services?.getEditTable({ userForm });
  }, [userForm]);

  useEffect(() => {
    // gettting details of row
    if (openForm?.divType === "edit") {
      services?.getEditTable({ setUserForm });
    }
  }, [openForm?.divType]);

  // useEffect(() => {
  //   projectDropdown();
  // }, []);

  useEffect(() => {
    projectDropdown();
  }, [services?.status]);

  const fetchProjectDropdownData = async (
    url
    // payload = { status: services?.status }
  ) => {
    try {
      const response = await APIRequest.request(
        "POST",
        url,
        JSON.stringify({ status: services?.status })
      );
      if (response?.data?.responseCode === 109) {
        setUserForm((prev) => ({
          ...prev,
          projectId: response?.data?.result[0]?._id ?? "",
          projectName: response?.data?.result[0]?.projectName ?? "",
          floorNo: "",
          flatNo: "",
          room: "",
          flat: "",
          floor: "",
          roomName: "",
          startDate: "",
          endDate: "",
        }));
      }
    } catch (error) {
      publishNotification("Error while fetching data", "error");
    }
  };

  const projectDropdown = () =>
    fetchProjectDropdownData(ConfigAPIURL.projectDropdown);

  return {
    userForm,
    setUserForm,
    initialUserForm: taskDetails,
  };
};

export default useAevForm;
