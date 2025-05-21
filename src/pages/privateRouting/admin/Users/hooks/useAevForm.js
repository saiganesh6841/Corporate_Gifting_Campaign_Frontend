import React, { useEffect, useState } from "react";
const form = {
  userId: "",
  userType: "admin",
  fullName: "",
  email: "",
  mobileNo: null,
  permission: null,
  permissionName: "",
  password: "",
  dob: null,
  gender: null,
  profileImage: "",
};

const useAevForm = ({ openForm, services }) => {
  const [userForm, setUserForm] = useState(form);

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
      services?.getUserRatings();
    }
    if (openForm?.divType === "add") {
      services?.fetchRoles();
    }
  }, [openForm?.divType]);

  return {
    userForm,
    setUserForm,
    initialUserForm: form,
  };
};

export default useAevForm;
