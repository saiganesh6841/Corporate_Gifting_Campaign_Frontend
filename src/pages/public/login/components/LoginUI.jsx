import { useTheme } from "@mui/styles";
import React, { useEffect } from "react";
import useStyles from "../styles/style";
import { Button, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CustomTextFiled from "../../../../components/loginInputFields";
import PrimaryBtn from "../../../../components/button";
import LoginFields from "./LoginComponent";
import OtpField from "./OtpComponent";
import loginLogo from "../../../../assets/Images/snapFlowLoginImg.png";

function LoginUI({ services, classes }) {
  const {
    loginDetails,
    setLoginDetails,
    errors,
    setErrors,
    onAccountLogin,
    otpTrue,
    seconds,
    minutes,
    setMinutes,
    setSeconds,
    resendOTP,
  } = services;

  useEffect(() => {
    if (otpTrue) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [otpTrue, seconds, minutes]);

  return (
    <>
      <div className={classes.loginPage}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "6px 0px",
          }}
        >
          <img src={loginLogo} width="120px" height="100px" />
        </div>
        <Typography className={classes.titleText}>
          {!otpTrue ? "Login" : "Verify OTP"}
        </Typography>
        <Typography className={classes.subTitleText}>
          {!otpTrue
            ? "Please Login to your account"
            : `Sent to ${loginDetails?.mobileNo}`}
        </Typography>
        <br />
        {!otpTrue ? (
          <LoginFields
            services={services}
            classes={classes}
            errors={services?.errors}
          />
        ) : (
          <OtpField
            otp={services.otp}
            setOTP={services.setOTP}
            seconds={seconds}
            minutes={minutes}
            resendOTP={resendOTP}
            classes={classes}
          />
        )}

        {/* <OtpField /> */}
        <br />
        <PrimaryBtn
          onClick={() => {
            !otpTrue ? services?.onAccountLogin() : services?.verifyOTP();
          }}
        >
          {!otpTrue ? "Continue" : "Login"}
        </PrimaryBtn>
      </div>
    </>
  );
}

export default LoginUI;
