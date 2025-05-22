import React from "react";
import { Dismiss16Filled } from "@fluentui/react-icons";
import PrimaryBtn from "../button/index";
import { Typography } from "@mui/material";
import useStyles from "./styles/style";

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
                color: "#1EA5FC",
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            <div>
              {isDownloadTemplateButtonVisible && (
                <PrimaryBtn
                  style={{
                    marginRight: "12px",
                  }}
                  onClick={onDownloadTemplate}
                >
                  Download Template
                </PrimaryBtn>
              )}
              <Dismiss16Filled
                style={{
                  color: "#1EA5FC",
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
