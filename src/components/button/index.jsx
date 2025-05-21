import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
export const useStyles = makeStyles((theme) => ({
  primary: {
    background: theme.palette.primary.main,
    borderRadius: "2px",
    padding: "8px 20px",
    transition: "all 0.15s linear",
    border: "none",
    outline: "none",
    color: "white",
    fontWeight: 600,
    lineHeight: "20px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",

    "&:hover": {
      boxShadow: "0 0 10px 0.5px rgba(0, 0, 0, 0.2)",
      transform: "scale(0.98)",
    },
  },
}));

const PrimaryBtn = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { onClick, children, style, disabled, variant = "primary" } = props;

  return (
    <button
      disabled={disabled}
      type="button"
      style={{
        ...style,
        backgroundColor: disabled && theme.palette.primary.main,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={classes?.[variant]}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
