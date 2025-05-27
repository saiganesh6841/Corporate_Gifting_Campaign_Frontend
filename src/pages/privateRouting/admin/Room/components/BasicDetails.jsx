import { IconButton, Stack } from "@fluentui/react";
import { Field, Input } from "@fluentui/react-components";
import { Box, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LogoUploader from "../../../../../components/LogoUploader/LogoUploader";
import utilController from "../../../../../utils/Utilcontroller";
import { useTheme } from "@mui/styles";
import { ColorFilled, Eye16Filled } from "@fluentui/react-icons";
import DialogModal from "../../../../../components/Dialog/Index";

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  errors,
}) {
  const theme = useTheme();
  const colorInputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(userForm,"user data")

  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    delete errors[name];
  };

  return (
    <Grid container spacing={2}>
      {userForm?.roomLogo && userForm?.roomName && userForm?.color && (
        <Grid item xs={12}>
          {" "}
          <Stack className={classes.preview}>
            <div className={classes.eyeFilled} onClick={() => setIsOpen(true)}>
              <Eye16Filled /> Preview
            </div>
          </Stack>
        </Grid>
      )}

      <Grid item xs={12}>
        <Stack
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* For uploading the profile image */}
          <LogoUploader
            logoUrl={userForm?.roomLogo}
            onUpload={(url) => setUserForm({ ...userForm, roomLogo: url })}
            error={errors}
            name="roomLogo"
          />
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Field
          className={classes.label}
          label="Room Name"
          required
          validationMessage={
            errors?.roomName ? "Room Name field is required" : ""
          }
          htmlFor="roomName"
        >
          <Input
            id="roomName"
            className={"input__Style"}
            size={"large"}
            placeholder="Enter your full name"
            value={userForm?.roomName || ""}
            onChange={(e) => handleChange(e, "roomName")}
            disabled={openForm?.divType === "view"}
          />
        </Field>
      </Grid>

      <Grid item xs={6} style={{ position: "relative" }}>
        <Field
          className={classes.label}
          label="Color Code"
          validationMessage={
            errors?.color ? "Color Code field is required" : ""
          }
          htmlFor="color"
        >
          <Input
            id="color"
            className={"input__Style"}
            size={"large"}
            placeholder="Enter a color code"
            value={userForm?.color || ""}
            onChange={(e) => handleChange(e, "color")}
            disabled={openForm?.divType === "view"}
            // Remove hidden input from here (don't cover full input)
            contentAfter={
              <InputAdornment position="end" style={{ position: "relative" }}>
                <IconButton
                  onClick={() => {
                    if (openForm?.divType === "view") return;
                    colorInputRef.current?.click();
                  }}
                  disabled={openForm?.divType === "view"}
                  aria-label="Pick color"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <ColorFilled primaryFill="#4F5CE7" fontSize={24} />
                </IconButton>

                {/* Place hidden color input exactly over the icon */}
                <input
                  ref={colorInputRef}
                  type="color"
                  value={userForm?.color || "#000000"}
                  onChange={(e) => handleChange(e, "color")}
                  className={classes.inputColorPicker}
                />
              </InputAdornment>
            }
          />
        </Field>
      </Grid>

      <DialogModal
        isOpen={isOpen}
        onDismissModal={() => setIsOpen(false)}
        title={"Preview"}
        width={"180px"}
      >
        <div
          className={classes.imagePreview}
          style={{ backgroundColor: userForm?.color || "#ffffff" }}
        >
          {userForm?.roomLogo ? (
            <img
              src={userForm?.roomLogo}
              alt="Logo Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span style={{ color: "#fff" }}>No Logo</span>
          )}
        </div>
      </DialogModal>
    </Grid>
  );
}

export default BasicDetails;
