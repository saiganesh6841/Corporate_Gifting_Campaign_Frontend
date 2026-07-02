import { Stack } from "@fluentui/react";
import { Button, Spinner } from "@fluentui/react-components";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
import { useDropzone } from "react-dropzone";
import images from "../../image.js";
import useAlert from "../../hooks/useAlert.js";
import { Typography } from "@mui/material";
import PrimaryBtn from "../button/index.jsx";

const useStyles = makeStyles((theme) => ({
  regular: {
    padding: "16px",
    borderRadius: "16px",
    alignItems: "center",
  },
  imageUploadContainer: {
    padding: "16px",
    borderRadius: "16px",
    alignItems: "center",
    border: `2px dashed ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const Upload = ({
  fileType,
  handleUpload,
  id,
  disabled,
  isLoading,
  isExcel,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { publishNotification } = useAlert();

  const acceptedFileTypes = [".jpeg", ".png", ".jpg", ".pdf", ".doc", ".docx"];

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles, "acceptedFiles");
    const filteredFiles = acceptedFiles?.filter((file) =>
      acceptedFileTypes?.some((type) => file?.name?.endsWith(type)),
    );
    if (filteredFiles?.length) {
      handleUpload({ target: { files: filteredFiles } });
    } else {
      publishNotification(
        "Unsupported file type. Please upload a valid file.",
        "error",
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    noClick: true,
    accept: acceptedFileTypes.join(","),
    multiple: true,
    noDragEventsBubbling: true,
  });

  return (
    <Stack
      {...getRootProps()}
      className={`${
        isDragActive || isFocused
          ? classes.imageUploadContainer
          : classes.regular
      }`}
    >
      <Stack horizontal horizontalAlign="center">
        <img
          style={{ width: "60px", height: "60px" }}
          src={images.uploadIcon}
          alt="upload"
        />
      </Stack>
      <Typography
        variant="heading"
        cap={"none"}
        style={{
          fontWeight: 600,
          marginTop: theme.spacingArea.XLarge,
        }}
      >
        Upload your files here
      </Typography>
      <Typography
        variant="subheading"
        cap={"none"}
        style={{
          textAlign: "center",
          margin: theme.spacingArea.small,
        }}
      >
        <span style={{ color: " #868686" }}>
          {isExcel ? "(xls , xlsx and csv)" : "(pdf, doc and jpeg)"}
        </span>
      </Typography>

      {isLoading ? (
        <Spinner />
      ) : (
        <PrimaryBtn
          style={{ marginTop: theme.spacingArea.large }}
          disabled={disabled}
        >
          <label htmlFor={"upload" + id}>
            <Typography
              variant="heading"
              cap={"none"}
              style={{
                fontWeight: 400,
                cursor: "pointer",
                color: "white",
              }}
            >
              Upload Files
            </Typography>
          </label>
        </PrimaryBtn>
      )}

      <input
        multiple
        id={"upload" + id}
        type="file"
        style={{ display: "none" }}
        {...getInputProps()}
        onChange={handleUpload}
        onClick={(e) => (e.target.value = "")}
      />
    </Stack>
  );
};

export default Upload;
