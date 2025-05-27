import React from "react";
import { Dismiss16Filled } from "@fluentui/react-icons";
import PrimaryBtn from "../button/index";
import { Typography } from "@mui/material";
import useStyles from "./styles/style";
import { useTheme } from "@mui/styles";

function DialogModal({
  width,
  title,
  children,
  isOpen,
  onDownloadTemplate,
  onDismissModal,
  isDownloadTemplateButtonVisible,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    isOpen && (
      <div className={classes.setUpModal}>
        <div
          style={{
            width: width ? width : "500px",
            height: "auto",
          }}
          className={classes.modal}
        >
          <div className={classes.children}>
            <Typography
              variant="heading"
              style={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            <div>
              <Dismiss16Filled
                style={{
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                }}
                onClick={onDismissModal}
              />
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  );
}

export default DialogModal;
