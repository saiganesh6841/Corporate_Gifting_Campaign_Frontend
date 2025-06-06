import { IconButton, Stack } from "@fluentui/react";
import {
  Field,
  Input,
  Option,
  Combobox,
  Dropdown,
} from "@fluentui/react-components";

import { Box, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import PrimaryBtn from "../../../../../components/button";
import { Delete16Filled } from "@fluentui/react-icons";
import DatePickerComponent from "../../../../../components/DatePicker/Index";
import ProjectDetails from "./ProjectDetails";
import RoomDetails from "./roomDetails";
import AssignSuperVisor from "./AssignSuperVisor";
import AssignWorker from "./AssignWorker";
import LogoUploader from "../../../../../components/LogoUploader/LogoUploader";
import ProjectInformation from "./Information";

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  errors,
  services,
  editDeleteFloor,
  editDeleteFlat,
}) {
  const theme = useTheme();
  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    delete errors[name];
  };

  console.log(userForm, "userForm");
  return (
    <Grid container spacing={2}>
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
            logoUrl={userForm?.uploadImage}
            onUpload={(url) => setUserForm({ ...userForm, uploadImage: url })}
            error={errors}
            name="uploadImage"
          />
        </Stack>
      </Grid>

      {openForm?.divType === "edit" && (
        <Grid item xs={12}>
          <ProjectInformation
            classes={classes}
            userForm={userForm}
            setUserForm={setUserForm}
            disabled={openForm?.divType === "view"}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <ProjectDetails
          userForm={userForm}
          setUserForm={setUserForm}
          openForm={openForm}
          classes={classes}
          errors={errors}
        />
      </Grid>

      <Grid item xs={12}>
        <RoomDetails
          userForm={userForm}
          setUserForm={setUserForm}
          classes={classes}
          services={services}
          openForm={openForm}
          editDeleteFloor={editDeleteFloor}
          editDeleteFlat={editDeleteFlat}
        />
      </Grid>

      <Grid item xs={5}>
        <AssignSuperVisor
          classes={classes}
          services={services}
          userForm={userForm}
          setUserForm={setUserForm}
          errors={errors}
        />
      </Grid>
      <Grid item xs={5}>
        <AssignWorker
          classes={classes}
          services={services}
          userForm={userForm}
          setUserForm={setUserForm}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
