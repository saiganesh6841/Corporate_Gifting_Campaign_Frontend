import { Stack } from "@fluentui/react";
import { ProgressBar, Text, Tooltip } from "@fluentui/react-components";
import {
  ArrowDownload24Filled,
  CheckmarkCircle24Regular,
  Delete24Filled,
  Delete24Regular,
  Info24Filled,
  Info24Regular,
} from "@fluentui/react-icons";
import { Box, Typography } from "@mui/material";
import React from "react";
import { BundleIcon } from "../icons/Icon.jsx";
import { useStyles } from "./style.js";

export default function UploadExcel({
  handleDelete,
  rangeValue,
  handleMouseEnter,
  handleMouseLeave,
  isShowPopOver,
  isShowDeleteButton,
  successItems,
  failedItems,
  downloadFailedData,
  excelName,
}) {
  const classes = useStyles();

  return (
    <Stack
      verticalAlign="center"
      className={classes.uploadExcelRoot}
      style={{}}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="baseline"
        style={{ width: "100%" }}
        tokens={{ childrenGap: 12 }}
      >
        <Stack
          horizontal
          verticalAlign="center"
          style={{ gap: "1rem", width: "100%" }}
        >
          <CheckmarkCircle24Regular
            style={{
              color: rangeValue > 0 ? "#2ACB3A" : "#FF2C55",
              transform: "scale(1.2)",
            }}
          />

          <span style={{ width: "80%" }} className="excelUploadProgressive">
            <Text truncate wrap={false} style={{ fontSize: "1rem" }}>
              {excelName}
            </Text>
            <ProgressBar
              thickness="large"
              style={{ height: "0.5rem", marginTop: "5px" }}
              value={rangeValue}
            />
          </span>
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 8 }}
          style={{
            position: "relative",
          }}
        >
          {failedItems?.length > 0 && (
            <BundleIcon
              iconStyle={{ color: "#FF2C55" }}
              regularIcon={Info24Regular}
              filledIcon={Info24Filled}
              onMouseEnter={handleMouseEnter}
            />
          )}
          {isShowPopOver && (
            <Box
              className={classes.infoPopOver}
              onMouseLeave={handleMouseLeave}
            >
              <Typography>
                {`${successItems?.length}/${
                  successItems?.length + failedItems?.length
                } data imported`}
              </Typography>
              <Tooltip content={"Download Failed Data"}>
                <ArrowDownload24Filled
                  onClick={downloadFailedData}
                  style={{ color: "#1EA5FC", cursor: "pointer" }}
                />
              </Tooltip>
            </Box>
          )}
          {isShowDeleteButton && (
            <BundleIcon
              regularIcon={Delete24Regular}
              filledIcon={Delete24Filled}
              onClick={handleDelete}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
