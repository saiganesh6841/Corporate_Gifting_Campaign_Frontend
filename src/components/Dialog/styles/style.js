import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  setUpModal: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999999,
  },
  modal: {
    height: "auto",
    background: "#fff",
    borderRadius: "10px",
    padding: "0px",
  },
  children: {
    backgroundColor: "#ECF8FF",
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "8px 12px",
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
}));

export default useStyles;
