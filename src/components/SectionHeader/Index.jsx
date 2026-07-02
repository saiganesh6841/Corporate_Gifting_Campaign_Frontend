import React from "react";
import MuiTypography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Icon } from "@fluentui/react";
import PrimaryBtn from "../button";

const SectionHeading = ({
  title,
  classes,
  theme,
  icon,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <Box
      sx={{
        gap: 1,
        height: "48px",
        backgroundColor: theme.palette.background.default,
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        display: "flex",
        alignItems: "center",
        // justifyContent: "start",
        justifyContent: "space-between",
        padding: "12px",
      }}
    >
      {icon && (
        <Box
          sx={{
            borderRadius: "100%",
            background: theme.palette.secondary.main,
          }}
        >
          <Icon
            iconName="Home"
            styles={{ root: { fontSize: 20, color: "white", padding: "6px" } }}
          />
        </Box>
      )}
      <MuiTypography
        variant="subDescription"
        style={{
          fontWeight: "700",
          color: theme?.palette?.primary?.main,
        }}
      >
        {title}
      </MuiTypography>
      {buttonText && (
        <PrimaryBtn
          style={{ width: "auto", padding: "8px 12px" }}
          onClick={buttonOnClick}
        >
          Select Products
        </PrimaryBtn>
      )}
    </Box>
  );
};

export default SectionHeading;
