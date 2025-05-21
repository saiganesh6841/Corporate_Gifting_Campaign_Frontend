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
}));

export default useStyles;
