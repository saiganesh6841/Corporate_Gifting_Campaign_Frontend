import React, { useEffect, useState } from "react";
import fieldsValidation from "../../../../utils/FieldsValidation";
import APIRequest from "../../../../utils/APIRequest";
import ConfigAPIURL from "../../../../config/ConfigAPIURL";
import useAlert from "../../../../hooks/useAlert";
import LocalStorage from "../../../../config/LocalStorage";
import { useNavigate } from "react-router-dom";

const requiredFields = {
  email: "",
  password: "",
};
function useServices() {
  const { publishNotification } = useAlert();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otpTrue, setOtpTrue] = useState(false);
  const [otp, setOTP] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(25);

  useEffect(() => {
    isLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogin = async () => {
    const response = await APIRequest.request(
      "GET",
      ConfigAPIURL.sessionValidation,
      ""
    );
    if (response?.data?.responseCode === 109) {
      if (!response?.data?.user?.permission?.active) {
        publishNotification(
          "You do not have permission to log in. Please contact the administrator for assistance",
          "error"
        );
        localStorage.clear();
        sessionStorage.clear();
        return;
      }
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

    if (
      response?.data?.responseCode === 108 ||
      response?.data?.responseCode === 103
    ) {
      publishNotification("Wrong Credentials / User not found", "error");
    } else if (response?.data?.responseCode === 116) {
      publishNotification("Password attempts exceeded", "error", 3000);
    } else if (response?.data?.responseCode === 105) {
      publishNotification("otp send successfully", "success");

      setOtpTrue(true);
    }
  };

  const verifyOTP = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.verifyOtp,
      JSON.stringify({
        otpVal: otp,
      })
    );

    if (response !== undefined && response !== null) {
      if (response.data.responseCode === 109) {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        isLogin();
      } else if (response.data.responseCode === 118) {
        // setSnakbarValues({
        //   status: true,
        //   severity: "error",
        //   message: "Invalid OTP",
        // });
      } else if (response.data.responseCode === 112) {
        // setSnakbarValues({
        //   status: true,
        //   severity: "error",
        //   message: "You don't have any permission. Please contact admin",
        // });
      }
    } else {
      // setSnakbarValues({
      //   status: true,
      //   severity: "error",
      //   message: "Server Error, Please try after sometime",
      // });
    }
  };

  const resendOTP = async () => {
    setMinutes(0);
    setSeconds(25);

    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.accountLogin,
      JSON.stringify({
        ...loginDetails,
      })
    );

    //redirect based on user type
    if (
      response?.data?.responseCode === 108 ||
      response?.data?.responseCode === 103
    ) {
      publishNotification("Wrong Credentials", "error");
    } else if (response?.data?.responseCode === 116) {
      publishNotification("Exceeded Password attempt", "error");
    } else if (response?.data?.responseCode === 122) {
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      // setResetTimer(true);
      setOTP("");
      // setBlockEntry(false);
      publishNotification("OTP sent to your mobile number", "success");
    } else if (response.data.responseCode === 104) {
      publishNotification(
        "Password is not matching, please check your password",
        "error"
      );
    }
  };
  return {
    loginDetails,
    setLoginDetails,
    errors,
    setErrors,
    onAccountLogin,
    otpTrue,
    verifyOTP,
    otp,
    setOTP,
    seconds,
    minutes,
    setMinutes,
    setSeconds,
    resendOTP,
  };
}

export default useServices;
