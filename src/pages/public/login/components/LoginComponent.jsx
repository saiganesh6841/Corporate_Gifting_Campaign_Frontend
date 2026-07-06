import { Link, Typography } from "@mui/material";
import CustomTextFiled from "../../../../components/loginInputFields";
import { Link as RouterLink } from "react-router-dom";
import { Field } from "@fluentui/react-components";

const LoginFields = ({ services, classes, errors }) => {
  return (
    <div>
      <CustomTextFiled
        type={"number"}
        placeholder="Enter your Email"
        value={services?.loginDetails?.email}
        onChange={(e) => {
          services?.setLoginDetails((p) => ({
            ...p,
            email: e.target.value,
          }));
          delete errors?.email;
        }}
        field="Email"
        required={true}
        validationMessage={errors?.email}
      />
      <CustomTextFiled
        type={"password"}
        placeholder="Enter your password"
        value={services?.loginDetails?.password}
        onChange={(e) => {
          services?.setLoginDetails((p) => ({
            ...p,
            password: e.target.value,
          }));
          delete errors?.password;
        }}
        field="Password"
        required={true}
        validationMessage={errors?.password}
      />
      <div
        className={classes.forgotPassword}
        // style={{ display: otpState || forgotPassword ? "none" : "" }}
      >
        {/* <Link
          component={RouterLink}
          to="/admin/password/forgotpassword"
          style={{
            textDecoration: "none",
            // fontFamily: "Segoe UI",
            // visibility: "hidden",
          }}
        >
          <Typography className={classes.forgotPasswordText}>
            Forgot Password?
          </Typography>
        </Link> */}
      </div>
    </div>
  );
};
export default LoginFields;
