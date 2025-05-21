import React from "react";
import { Backdrop, Box } from "@mui/material";
import { Spinner } from "@fluentui/react";

const LoadingBackdrop = ({ accessDenied = false }) => {
  return (
    <Backdrop
      open
      style={{
        background:
          "linear-gradient(-45deg, #1EA5FC, #4a7ca3 33%, #5d84a3 66%, #9dc8c2 100%)",
      }}
    >
      <Spinner size={"48px"} />
      {accessDenied && (
        <Box style={{ position: "absolute", marginTop: "27%" }}>
          Sorry, You don't have permission. Redirecting...
        </Box>
      )}
    </Backdrop>
  );
};

export default LoadingBackdrop;
