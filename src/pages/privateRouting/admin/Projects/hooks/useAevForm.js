import React, { useEffect, useState } from "react";
import { projectDetails } from "../constants/constant";

const useAevForm = ({ openForm, services }) => {
  const [userForm, setUserForm] = useState(projectDetails);

  React.useEffect(() => {
    if (openForm?.isSaveForm) {
      const data = { ...userForm };
      let isEdit = false;
      // if the row details are found, update it
      if (openForm?.rowDetails) {
        isEdit = true;
      }
      services?.sendToServer(data, isEdit);
    }
  }, [openForm]);

  useEffect(() => {
    // gettting details of row
    if (openForm?.divType === "edit") {
      services?.getEditTable({ setUserForm });
    }
    if (openForm.divType === "view") {
      // services?.workerTable();
      services?.setRoomData([]);
      services?.getViewTable({ setUserForm });
    }
  }, [openForm?.divType]);

  const editDeleteFloor = async (projectId, floorId) => {
    await services?.deleteFloor(projectId, floorId);
    await services?.getEditTable({ setUserForm });
  };

  const editDeleteFlat = async (projectId, flatId) => {
    await services?.deleteFlat(projectId, flatId);
    await services?.getEditTable({ setUserForm });
  };

  return {
    userForm,
    setUserForm,
    initialUserForm: projectDetails,
    editDeleteFloor,
    editDeleteFlat,
  };
};

export default useAevForm;
