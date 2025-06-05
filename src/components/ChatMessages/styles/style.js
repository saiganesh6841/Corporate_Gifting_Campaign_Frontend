import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "16px",
    height: "100vh",
    overflowY: "auto",
  },
  messageWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  messageRowLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "60%",
  },
  messageRowRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto",
    maxWidth: "60%",
  },
  nameLabel: {
    fontSize: "12px",
    marginBottom: "4px",
    color: "#888",
  },
  messageBubble: {
    border: "1px solid #CCCCCC",
    borderRadius: "10px",
    padding: "12px",
    backgroundColor: "#FAFAFB",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    wordBreak: "break-word",
  },
  timestamp: {
    fontSize: "11px",
    color: "#aaa",
    marginTop: "4px",
    alignSelf: "flex-end",
    textAlign: "left",
  },
  timestampRight: {
    fontSize: "11px",
    color: "#aaa",
    marginTop: "4px",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  avatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    fontSize: "10px",
    backgroundColor: "#b31b34",
  },
  rightRowTop: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  leftRowTop: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
}));
