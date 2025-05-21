import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  inputStyles: {
    padding: "8px 16px",
    fontSize: "16px",
    border: "1px solid #E5E5E5",
    height: "49px",
    borderRadius: "8px",
    width: "100%",

    "&:focus": {
      border: "1px solid #4F5CE7",
      outline: "1px solid #4F5CE7",
    },
  },
}));

export default useStyles;
