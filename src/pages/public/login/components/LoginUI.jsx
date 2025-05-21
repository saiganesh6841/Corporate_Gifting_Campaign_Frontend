import { useTheme } from "@mui/styles";
import React from "react";
import useStyles from "../styles/style";
import { Button } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CustomTextFiled from "./CustomTextFiled";
import Typography from "../../../../components/Text/Typography";

function LoginUI({ services }) {
  const { loginDetails, setLoginDetails, errors, setErrors, onAccountLogin } =
    services;
  return (
    <>
      <CustomTextFiled
        placeholder="Email"
        value={loginDetails?.email || ""}
        onChange={(e) => {
          setLoginDetails((p) => ({ ...p, email: e.target.value }));
          setErrors({ ...errors, email: "" });
        }}
        validationMessage={errors?.email || ""}
      />
      <CustomTextFiled
        placeholder="Password"
        type="password"
        validationMessage={errors?.password || ""}
        onChange={(e) => {
          setLoginDetails((p) => ({ ...p, password: e.target.value }));
          setErrors({ ...errors, password: "" });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && loginDetails?.password) {
            onAccountLogin();
          }
        }}
      />
      <Typography
        variant="heading"
        style={{
          textAlign: "end",
          marginTop: "0px",
          position: "relative",
          bottom: "20px",
          color: "#829CC3",
          fontWeight: "400",
        }}
      >
        Forgot Password?
      </Typography>

      <Button
        sx={{
          backgroundColor: "#7A8391",
          width: "100%",
          color: "#E6EBF2",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "400",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#666F79",
          },
        }}
        onClick={onAccountLogin}
      >
        Log in
      </Button>
    </>
  );
}

export default LoginUI;
