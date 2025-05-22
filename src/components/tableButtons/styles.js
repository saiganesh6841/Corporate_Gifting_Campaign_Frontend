import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    columnGap: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: "10px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#EFF9FF",
    },
  },
  iconWraper: {
    flexDirection: "row",
    alignItems: "center",
    // columnGap: "10px",
  },
});
