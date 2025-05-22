import { BASE_THEME } from "./base";
import { createTheme } from "@mui/material/styles";

export const LIGHT = createTheme(BASE_THEME, {
  name: "LIGHT",

  title: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "37.24px",
    color: "#323130",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "21.79px",
  },

  subHeading: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "19px",
  },
  content: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "24px",
  },

  palette: {
    mode: "light",
    primary: {
      main: "#561E1E",
    },
    secondary: {
      main: "#C98383",
    },
    info: {
      main: "#1EA5FC",
    },
    background: {
      default: "#F6F3F3", // body background color
    },
  },
  custom: {
    greenColor: "linear-gradient(120deg,rgba(126, 87, 194, 0.8), #fff )",
    orangeColor: "linear-gradient(to right, #f7971e, #ffd200)",
    ongoingColor: "linear-gradient(to right, #de6262, #ffb88c)",
    verifyPaymentColor: "linear-gradient(to right, #d53369, #cbad6d)",
    deliveredColor: "linear-gradient(to right, #a73737, #7a2828)",
    completedColor: "linear-gradient(to right, #f857a6, #ff5858)",
    refundedColor: "linear-gradient(to right, #4b6cb7, #182848)",
    cancelledColor: "linear-gradient(to right, #fc354c, #0abfbc)",
    background: "#fff",
    whiteFont: "#fff",
    dialogToolbar: "#7e57c2",
    containerColor: "white",
    topHeader: {
      toolbarColor: "#444791",
      toolBarLogout: "#fff",
      toolBarLanguage: "#fff",
    },
    sideDrawer: {
      boxShadow: "0 10px 15px -5px rgba(62, 57, 107, .07)",
      backdropFilter: "saturate(180%) blur(20px)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      companyName: "rgba(0, 0, 0, 0.87)",
      userName: "#000",
      menuColor: "#000",
    },
    table: {
      selectedRow: "rgba(126, 87, 194, 0.9)",
    },
  },
});
