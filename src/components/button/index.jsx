import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
export const useStyles = makeStyles((theme) => ({
  primary: {
    background: theme.palette.primary.main,
    borderRadius: "6px",
    padding: "8px 20px",
    transition: "all 0.15s linear",
    border: "none",
    outline: "none",
    color: "white",
    fontWeight: 500,
    lineHeight: "20px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",

    "&:hover": {
      boxShadow: "0 0 10px 0.5px rgba(0, 0, 0, 0.2)",
      transform: "scale(0.98)",
    },
  },

  outlined: {
    background: "#fff",
    borderRadius: "6px",
    padding: "8px 20px",
    transition: "all 0.15s linear",
    border: "1px solid #ccc",
    outline: "none",
    color: "black",
    fontWeight: 500,
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
  console.log(props, "style");
  const {
    onClick,
    children,
    style = {},
    disabled,
    variant = "primary",
  } = props;
  console.log(style, "style");
  return (
    <button
      disabled={disabled}
      type="button"
      style={{
        ...style,
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
