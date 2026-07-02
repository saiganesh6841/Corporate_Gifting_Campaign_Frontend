import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  uploadExcelRoot: {
    width: "100%",
    gap: "0.6rem",
    marginTop: "0.5rem",
    marginBottom: "20px",
  },
  infoPopOver: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    minWidth: "280px",
    height: "60px",
    backgroundColor: "#ffff",
    boxShadow: "0px 6.4px 14.4px 0px #00000021",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
