import { createTheme } from "@mui/material/styles";
import "./font.css";

const font = "Poppins";

export const BASE_THEME = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: "200px",
          maxWidth: "400px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          zIndex: 1300,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {},
        container: {},
        paperFullScreen: {
          background:
            "linear-gradient(275deg, rgba(8,255,239,1) 44%, rgba(0,212,198,1) 52%, rgba(0,171,159,1) 100%)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: " #FFFFFF",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          paddingRight: "3px",
          fontFamily: font,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#FF6F00",
          "&.Mui-checked": {
            color: "#FF6F00",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontFamily: font,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: font,
          fontSize: 16,
        },
        body1: {
          fontFamily: font,
          fontSize: 16,
        },
        body2: {
          fontFamily: font,
          fontSize: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: font,
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: font,
          color: "#666c73",
        },
        head: {
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: font,
          color: "#666c73",
        },
        body: {
          fontFamily: font,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          width: "max-content",
          fontFamily: font,
          lineHeight: "0",
        },
        asterisk: {
          color: "red",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontFamily: font,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        label: {
          backgroundColor: "#fff",
          border: "2px solid #FF6F00",
          padding: "7px 20px",
          borderRadius: 15,
          color: "#FF6F00",
          fontWeight: "bold",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        selected: {
          backgroundColor: "#FF6F00",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#FF6F00",
        },
      },
    },
  },
  typography: {
    fontFamily: font,
    title: {
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: "37.24px",
      color: "#323130",
    },
    heading: {
      fontSize: "16px",
      fontWeight: 700,
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
  },
  spacing: [4, 8, 12, 16, 24, 32], // xSmall, small, medium, large, XLarge, doubleLarge
  topNavbar: {
    height: "3.125rem",
  },
});
