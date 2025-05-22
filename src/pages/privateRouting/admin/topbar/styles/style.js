import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "2.125rem",
    width: "85px",
    objectFit: "contain",
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      minHeight: theme.topNavbar.height,
    },
    minHeight: theme.topNavbar.height,
    left: 0,
    right: 0,
    backgroundImage: theme.custom.topHeader.toolbarColor,
    borderRadius: "0px 0px 15px 15px",
  },
  appBarDrawerClose: {
    backgroundImage: theme.custom.topHeader.toolbarColor,
  },
  Toolbar: {
    minHeight: theme.topNavbar.height,
    // marginLeft: ".8rem",
    padding: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  textLimit: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  floatRight: {
    textAlign: "right",
  },
  languageMenuColor: {
    color: theme.custom.topHeader.toolBarLanguage,
    background: "transparent",
  },
  logoutIcon: {
    color: theme.custom.topHeader.toolBarLogout,
  },
  profile: {
    width: "40px",
    height: "35px",
    borderRadius: "100%",
    overflow: "hidden",
  },
}));

export default useStyles;
