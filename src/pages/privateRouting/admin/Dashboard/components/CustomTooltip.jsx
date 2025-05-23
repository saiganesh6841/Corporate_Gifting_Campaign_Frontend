import { Box, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../styles/style";
import { formatCamelCaseToWords } from "../utils/util";
import useStructuredData from "../hooks/useStructuredData";

function CustomTooltip({ payload, moduleType }) {
  const classes = useStyles();
  const { tooltipHeadingContent, tooltipBodyContent } = useStructuredData({
    payload,
    moduleType,
  });

  return (
    <Box className={classes.tooltipContainer}>
      <Typography
        variant="content"
        style={{
          fontWeight: "600",
          marginBottom: "12px",
          borderBottom: "1px solid #F1F1F1",
        }}
      >
        {tooltipHeadingContent?.headingName} :{" "}
        {tooltipHeadingContent?.headingCount}
      </Typography>
      {tooltipBodyContent?.map((data) => (
        <Typography
          variant="content"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            marginBottom: "4px",
          }}
        >
          {data?.name} : {data?.count}
        </Typography>
      ))}
    </Box>
  );
}

export default CustomTooltip;
