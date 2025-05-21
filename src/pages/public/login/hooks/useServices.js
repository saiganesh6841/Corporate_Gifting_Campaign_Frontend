import React, { useEffect, useState } from "react";
import fieldsValidation from "../../../../utils/FieldsValidation";
import APIRequest from "../../../../utils/APIRequest";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import useAlert from "../../../../hooks/useAlert";
import LocalStorage from "../../../../config/LocalStorage";
import { useNavigate } from "react-router-dom";

const requiredFields = {
  mobileNo: "",
  password: "",
};
function useServices() {
  const { publishNotification } = useAlert();
  const [loginDetails, setLoginDetails] = useState({
    mobileNo: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // isLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogin = async () => {
    const response = await APIRequest.request(
      "GET",
      ConfigAPIURL.sessionValidation,
      ""
    );
    if (response?.data?.responseCode === 109) {
      const userDetails = { ...response?.data?.user };
      LocalStorage.userDetails = userDetails;
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      publishNotification("User successfully logged in", "success");
      navigate("/admin");
    } else if (response?.data?.responseCode === 118) {
      navigate("/login");
    }
  };

  const onAccountLogin = async () => {
    const validationErrors = fieldsValidation(loginDetails, requiredFields);
    if (validationErrors !== true) {
      setErrors(validationErrors);
      return;
    }

    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.accountLogin,
      JSON.stringify({
        ...loginDetails,
      })
    );

    if (response?.data?.responseCode === 109) {
      await isLogin();
    } else {
      publishNotification(response?.data?.message, "error");
    }

    console.log(response, "loginResponse");

    console.log(loginDetails, "loginDetails");
  };
  return {
    loginDetails,
    setLoginDetails,
    errors,
    setErrors,
    onAccountLogin,
  };
}

export default useServices;
