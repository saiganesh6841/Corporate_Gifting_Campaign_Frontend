import { Grid } from "@mui/material";
import PrimaryBtn from "../../../components/button";
import CustomTextFiled from "../../../components/loginInputFields";
import useServices from "./hooks/useServices";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles/style";
import LoginUI from "./components/LoginUI";
import loginImage from "../../../assets/Images/image.png";

function Login() {
  const services = useServices();
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1} sx={{ height: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // height: "100vh",
          }}
        ></Grid>
        <Grid item xs={6} className={classes.secondGrid}>
          <LoginUI services={services} classes={classes} />
        </Grid>
      </Grid>
    </>
    // <div>
    //   <CustomTextFiled
    //     type={"number"}
    //     placeholder="Enter you mobile number"
    //     value={services?.loginDetails?.mobileNo}
    //     onChange={(e) => {
    //       services?.setLoginDetails((p) => ({
    //         ...p,
    //         mobileNo: e.target.value,
    //       }));
    //     }}
    //   />
    //   <CustomTextFiled
    //     type={"password"}
    //     placeholder="Enter your password"
    //     value={services?.loginDetails?.password}
    //     onChange={(e) => {
    //       services?.setLoginDetails((p) => ({
    //         ...p,
    //         password: e.target.value,
    //       }));
    //     }}
    //   />

    //   <PrimaryBtn
    //     onClick={() => {
    //       services?.onAccountLogin();
    //     }}
    //   >
    //     Login
    //   </PrimaryBtn>
    // </div>
  );
}

export default Login;
