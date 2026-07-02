import React from "react";
import { Dismiss16Filled } from "@fluentui/react-icons";
import PrimaryBtn from "../button";
import { Typography } from "@mui/material";

function BulkUploadDialog({
  width,
  title,
  children,
  isOpen,
  onDownloadTemplate,
  onDismissModal,
  isDownloadTemplateButtonVisible,
}) {
  return (
    isOpen && (
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999999,
        }}
      >
        <div
          style={{
            width: width ? width : "500px",
            height: "auto",
            background: "#fff",
            borderRadius: "10px",
            padding: "0px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ECF8FF",
              position: "sticky",
              top: 0,
              zIndex: 1,
              padding: "8px 12px",
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Typography
              variant="heading"
              style={{
                color: "#1EA5FC",
                fontWeight: "bold",

                //   fontSize: "20px",
                //   padding: "10px 16px",
              }}
            >
              {title}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isDownloadTemplateButtonVisible && (
                <PrimaryBtn
                  style={{
                    marginRight: "10px",
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
                fontSize={40}
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

export default BulkUploadDialog;
