import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: "3.125rem",
    width: "85px",
    objectFit: "contain",
  },

  appBarDrawerClose: {
    backgroundColor: "#fff",
  },
  Toolbar: {
    // minHeight: theme.topNavbar.height,
    marginLeft: ".5rem",
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
