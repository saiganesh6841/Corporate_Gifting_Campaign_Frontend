import React, { useEffect, useState } from "react";
import { userDetails } from "../constants/constant";

const useAevForm = ({ openForm, services }) => {
  const userStorage = JSON.parse(localStorage.getItem("userDetails"));
  const [userForm, setUserForm] = useState({
    ...userDetails,
    organizationId: userStorage?.organizationId || "",
  });
  React.useEffect(() => {
    if (openForm?.isSaveForm) {
      const data = { ...userForm };
      let isEdit = false;
      // if the row details are found, update it
      if (openForm?.rowDetails) {
        isEdit = true;
      }
      console.log("Hello", data, isEdit);
      services?.sendToServer(data, isEdit);
    }
  }, [openForm]);

  useEffect(() => {
    // gettting details of row
    if (openForm?.divType === "edit" || openForm.divType === "view") {
      services?.getEditTable({ setUserForm });
    }
    // if (openForm?.divType === "add") {
    //   services?.fetchRoles();
    // }
  }, [openForm?.divType]);

  return {
    userForm,
    setUserForm,
    initialUserForm: userDetails,
  };
};

export default useAevForm;
