import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  parent: {
    position: "absolute",
    top: "35px",
    left: "-122px",
    zIndex: 101,
  },
  profileContainer: {
    minWidth: "250px",
    backgroundColor: "#fff",
    padding: "16px",
    boxShadow: "0px 6.4px 14.4px 0px #00000021",
    borderRadius: "4px",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "max-content",
  },
  title: {
    color: "#323130",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "Segoe UI",
  },
  role: {
    color: "#868686",
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Segoe UI",
  },
  pointer: {
    position: "relative",
    bottom: "92px",
    left: "132px",
    width: "20px",
    height: "20px",
    backgroundColor: "#ffff",
    transform: "rotate(45deg)",
    boxShadow: "0px 6.4px 14.4px 0px #00000021",
    zIndex: 0,
  },
  extraPointerHider: {
    width: "128px",
    height: "25px",
    bottom: "102px",
    left: "97px",
    backgroundColor: "#ffff",
    position: "relative",
  },
}));
