import { IconButton, Stack } from "@fluentui/react";
import {
  Field,
  FluentProvider,
  Input,
  Option,
  teamsLightTheme,
  Text,
  Combobox,
  Button,
  Dropdown,
} from "@fluentui/react-components";
import {
  Eye24Filled,
  EyeOff24Filled,
  ArrowCounterclockwiseRegular,
} from "@fluentui/react-icons";
import { Box, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoUploader from "../../../../../components/LogoUploader/LogoUploader";
import Reset from "../../../../../components/icons/Reset";
import utilController from "../../../../../utils/Utilcontroller";
import Validation from "../../../../../utils/Validation";
import { useTheme } from "@mui/styles";
import SectionHeading from "../../../../../components/SectionHeader/Index";
import DatePickerComponent from "../../../../../components/DatePicker/Index";

const genders = ["male", "female", "other"];

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  fetchRoles,
  errors,
  resetPasswordAttempts,
}) {
  const theme = useTheme();

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

  console.log(roles, "roles");
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
            logoUrl={userForm?.roomLogo}
            onUpload={(url) => setUserForm({ ...userForm, roomLogo: url })}
            error={errors}
          />
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Field
          className={classes.label}
          label="Full Name"
          required
          validationMessage={
            errors?.fullName ? "Full Name field is required" : ""
          }
          htmlFor="fullName"
        >
          <Input
            id="fullName"
            className={"input__Style"}
            size={"large"}
            placeholder="Enter your full name"
            value={userForm?.fullName || ""}
            onChange={(e) => handleChange(e, "fullName")}
            disabled={openForm?.divType === "view"}
          />
        </Field>
      </Grid>
      <Grid item xs={6}>
        <Field
          className={classes.label}
          label="Full Name"
          required
          validationMessage={
            errors?.fullName ? "Full Name field is required" : ""
          }
          htmlFor="fullName"
        >
          <Input
            id="fullName"
            className={"input__Style"}
            size={"large"}
            placeholder="Enter your full name"
            value={userForm?.fullName || ""}
            onChange={(e) => handleChange(e, "fullName")}
            disabled={openForm?.divType === "view"}
          />
        </Field>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
