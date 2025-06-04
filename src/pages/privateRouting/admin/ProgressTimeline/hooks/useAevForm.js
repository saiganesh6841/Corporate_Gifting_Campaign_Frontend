import React, { useEffect, useState } from "react";
import { taskDetails } from "../constants/constant";

const useAevForm = ({ openForm, services }) => {
  const [userForm, setUserForm] = useState(taskDetails);

  useEffect(() => {
    // gettting details of row
    if (userForm?.flatNo && userForm?.room)
      services?.getEditTable({ userForm });
  }, [userForm]);

  useEffect(() => {
    // gettting details of row
    if (openForm?.divType === "edit") {
      services?.getEditTable({ setUserForm });
    }
  }, [openForm?.divType]);

  return {
    userForm,
    setUserForm,
    initialUserForm: taskDetails,
  };
};

export default useAevForm;
