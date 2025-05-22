import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  inputStyles: {
    padding: "8px 16px",
    backgroundColor: "#E6EBF2",
    fontSize: "18px",
    border: "none",
    height: "35px",
    borderRadius: "8px",
    width: "400px",

    "&::placeholder": {
      color: "#4879C7",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  secondGrid: {
    backgroundColor: "#FDEAEA",
    padding: "90px !important",
  },
  loginPage: {
    boxShadow: "0px 6px 16px 0px #00000014",
    background: "#fff",
    width: "450px",
    // height: "500px",
    borderRadius: "6px",
    padding: "1rem",
  },
  titleText: {
    fontWeight: 700,
    textAlign: "left",
    fontSize: "18px",
  },
  subTitleText: {
    fontWeight: 500,
    textAlign: "left",
    fontSize: "14px",
    color: "#888888",
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "end",
    margin: 0,
    // fontFamily: "Segoe UI",
  },
  forgotPasswordText: {
    color: "#323130",
    // fontFamily: "Segoe UI",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    "&:hover": {
      color: "#1976D2",
      textDecoration: "underline",
    },
  },
  resendOTP: {
    textDecoration: "none",
    marginTop: "8px",
    cursor: "pointer",
    // fontFamily: "Segoe UI",
  },
}));

export default useStyles;
