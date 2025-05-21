import { BASE_THEME } from "./base";
import { createTheme } from "@mui/material/styles";

export const DARK = createTheme(BASE_THEME, {
  name: "DARK",
  palette: {
    mode: "dark",
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#419fab",
    },
    info: {
      main: "#669fba",
    },
    background: {
      default: "#333333",
      paper: "#424242",
    },
  },
  custom: {
    background: "#424242",
    containerColor:
      "linear-gradient(-45deg, #2196f3a1 0%, #2196f3a1 33%, #00bfa5a1 100%)",
    topHeader: {
      toolbarColor: "#444791",
      toolBarLogout: "#fff",
      toolBarLanguage: "#fff",
    },
    sideDrawer: {
      boxShadow: "0 10px 15px -5px rgba(62, 57, 107, .07)",
      backdropFilter: "saturate(180%) blur(20px)",
      backgroundColor: "rgba(66, 66, 66, 0.75)",
      companyName: "rgba(225, 225, 225, 0.87)",
      userName: "#fff",
      menuColor: "#fff",
    },
    table: {
      selectedRow: "rgba(126, 87, 194, 0.9)",
    },
  },
});
