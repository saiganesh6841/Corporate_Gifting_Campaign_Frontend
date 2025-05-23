import React from "react";
import Breadcrumbs from "../breadcrumbs/Index";
// import ResponsiveTypography from "../Typography/Text";

import { Stack } from "@fluentui/react";
import { Text } from "@fluentui/react-components";
import {
  bundleIcon,
  ChevronLeft20Filled,
  ChevronLeft20Regular,
} from "@fluentui/react-icons";
import { Typography } from "@mui/material";

const ChevronLeft = bundleIcon(ChevronLeft20Filled, ChevronLeft20Regular);

const Header = ({ text, children, classes }) => {
  return (
    <div className={classes.spaceBetween}>
      {/* <Stack verticalAlign="center" horizontal horizontalAlign="space-between">
        <Breadcrumbs />
      </Stack> */}
      <div>
        <Typography
          style={{
            fontWeight: 700,
            marginLeft: ".4rem",
            marginTop: ".8rem",
            marginBottom: ".8rem",
            fontSize: "28px",
          }}
        >
          {text}
        </Typography>
      </div>
      {children}
    </div>
  );
};

export default Header;
