import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  arrangeBtns: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },
}));

export default useStyles;
