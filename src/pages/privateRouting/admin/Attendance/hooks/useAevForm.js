import React, { useEffect, useState } from "react";
import { userDetails } from "../constants/constant";

const useAevForm = ({ openForm, services }) => {
  const [userForm, setUserForm] = useState(userDetails);
  const [selectedDate, setSelectedDate] = useState(null);

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
    if (openForm?.divType === "edit" || openForm.divType === "view") {
      services?.getEditTable({ setUserForm });
    }
  }, [openForm?.divType, openForm?.date]);

  return {
    userForm,
    setUserForm,
    initialUserForm: userDetails,
    selectedDate,
    setSelectedDate,
  };
};

export default useAevForm;
