import { Link, Typography } from "@mui/material";
import CustomTextFiled from "../../../../components/loginInputFields";
import { Link as RouterLink } from "react-router-dom";
import { Field } from "@fluentui/react-components";

const LoginFields = ({ services, classes }) => {
  return (
    <div>
      <CustomTextFiled
        type={"number"}
        placeholder="Enter you Email"
        value={services?.loginDetails?.email}
        onChange={(e) => {
          services?.setLoginDetails((p) => ({
            ...p,
            email: e.target.value,
          }));
        }}
        field="Email"
        required={true}
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
        }}
        field="Password"
        required={true}
      />
      <div
        className={classes.forgotPassword}
        // style={{ display: otpState || forgotPassword ? "none" : "" }}
      >
        <Link
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
        </Link>
      </div>
    </div>
  );
};
export default LoginFields;
