import { IconButton, Stack } from "@fluentui/react";
import { ArrowUpload24Filled, Delete20Regular } from "@fluentui/react-icons";
import { Grid } from "@mui/material";
import { useMemo, useRef } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import useUpload from "../../hooks/useUpload";
import utilController from "../../utils/Utilcontroller";

export default function AttachmentsInputField({
  attachments,
  id,
  disabled,
  onUpload,
  handleDeleteAttachment,
  uploadType,
  accept,
}) {
  const fileInputRef = useRef(null);

  const { multipleFilesUpload } = useUpload({ onUpload });

  // Normalize attachments into array
  const attachmentList = useMemo(() => {
    if (!attachments) return [];

    return Array.isArray(attachments) ? attachments : [attachments];
  }, [attachments]);

  const handleUploadClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        id={id || "attachments-wrapper"}
        style={{
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        <Grid container>
          <Grid item xs={11.3}>
            <Stack
              horizontal
              className="scroll__remove"
              style={{
                cursor: disabled ? "not-allowed" : "text",
                minHeight: 80,
                display: "flex",
                gap: 8,
                overflow: "auto",
                flexWrap: "wrap",
              }}
              tokens={{ childrenGap: 8 }}
            >
              {attachmentList.map((attachment, index) => {
                const ext = utilController
                  .getFileExtension(attachment)
                  ?.toLowerCase();

                const isImage = [
                  "jpg",
                  "jpeg",
                  "png",
                  "gif",
                  "webp",
                  "svg",
                ].includes(ext);

                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    {isImage ? (
                      <img
                        src={attachment}
                        alt={`attachment-${index}`}
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 8,
                          border: "1px solid #EFEFEF",
                          objectFit: "contain",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(
                            attachment,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      />
                    ) : (
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 8,
                          border: "1px solid #EFEFEF",
                          backgroundColor: "#f5f5f5",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          window.open(
                            attachment,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        <div style={{ width: "50%", height: "50%" }}>
                          <FileIcon
                            extension={ext}
                            {...(defaultStyles[ext] || defaultStyles.txt)}
                          />
                        </div>
                      </div>
                    )}

                    {!disabled && (
                      <IconButton
                        style={{
                          position: "absolute",
                          right: -5,
                          top: -5,
                          backgroundColor: "#ff4d4f",
                          borderRadius: "50%",
                          zIndex: 1,
                        }}
                        onClick={() => handleDeleteAttachment(index)}
                      >
                        <Delete20Regular style={{ color: "#fff" }} />
                      </IconButton>
                    )}
                  </div>
                );
              })}
            </Stack>
          </Grid>

          <Grid item xs={0.7}>
            <IconButton onClick={handleUploadClick} disabled={disabled}>
              <ArrowUpload24Filled />
            </IconButton>
          </Grid>
        </Grid>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={!uploadType}
        accept={accept || "image/*"}
        style={{ display: "none" }}
        onChange={multipleFilesUpload}
      />
    </div>
  );
}
