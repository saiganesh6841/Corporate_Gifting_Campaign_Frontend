import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
export const useStyles = makeStyles((theme) => ({
  primary: {
    background: theme.palette.primary.light,
    borderRadius: "9px",
    padding: "10px",
    transition: "all 0.15s linear",
    border: "1px solid #DCA2A2",
    outline: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
    lineHeight: "20px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",

    "&:hover": {
      //   boxShadow: "0 0 10px 0.5px rgba(0, 0, 0, 0.2)",
      transform: "scale(0.98)",
    },
  },

  outlined: {
    background: "#FAFAFB",
    borderRadius: "9px",
    padding: "10px",
    transition: "all 0.15s linear",
    border: "1px solid #CCCCCC",
    outline: "none",
    color: "#333333",
    fontWeight: 500,
    lineHeight: "20px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",

    "&:hover": {
      transform: "scale(0.98)",
    },
  },
}));

const DefaultButton = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    onClick,
    children,
    style = {},
    disabled,
    variant = "primary",
  } = props;
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

export default DefaultButton;
