import {
  Field,
  Input,
  Option,
  Combobox,
  Dropdown,
} from "@fluentui/react-components";

import { Box, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "../../../../../components/DatePicker/Index";
import Validation from "../../../../../utils/Validation";

const ProjectDetails = ({
  userForm,
  setUserForm,
  classes,
  errors,
  openForm,
}) => {
  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    delete errors[name];
  };

  const handleBlur = (field) => (e) => {
    const trimmedValue = e.target.value.trim();

    setUserForm((p) => ({
      ...p,
      [field]: trimmedValue,
    }));
  };

  return (
    <>
      <Box className="box_container">
        <Grid container spacing={2} style={{ padding: "10px" }}>
          <Grid item xs={4}>
            <Field label="Project ID" className={classes.label}>
              <Input
                disabled
                className={` input__Style`}
                value={userForm?.projectId}
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Project Name"
              required
              validationMessage={
                errors?.projectName ? "Project Name field is required" : ""
              }
              htmlFor="projectName"
            >
              <Input
                id="projectName"
                className={"input__Style"}
                size={"large"}
                placeholder="Enter project name"
                value={userForm?.projectName || ""}
                onChange={(e) => handleChange(e, "projectName")}
                disabled={openForm?.divType === "view"}
                onBlur={handleBlur("projectName")}
              />
            </Field>
          </Grid>

          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Location"
              required
              validationMessage={
                errors?.location ? "location field is required" : ""
              }
              htmlFor="location"
            >
              <Input
                id="location"
                className={"input__Style"}
                size={"large"}
                placeholder="Enter Location"
                value={userForm?.location || ""}
                onChange={(e) => handleChange(e, "location")}
                disabled={openForm?.divType === "view"}
                onBlur={handleBlur("location")}
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Client Name"
              required
              validationMessage={
                errors?.clientName ? "Client Name field is required" : ""
              }
              htmlFor="clientName"
            >
              <Input
                id="clientName"
                className={"input__Style"}
                size={"large"}
                placeholder="Enter Client Name"
                value={userForm?.clientName || ""}
                onChange={(e) => handleChange(e, "clientName")}
                disabled={openForm?.divType === "view"}
                onBlur={handleBlur("clientName")}
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Company Name"
              required
              validationMessage={
                errors?.companyName ? "Company Name field is required" : ""
              }
              htmlFor="companyName"
            >
              <Input
                id="companyName"
                className={"input__Style"}
                size={"large"}
                placeholder="Enter your company name"
                value={userForm?.companyName || ""}
                onChange={(e) => handleChange(e, "companyName")}
                disabled={openForm?.divType === "view"}
                onBlur={handleBlur("companyName")}
              />
            </Field>
          </Grid>

          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Mobile Number"
              required
              validationMessage={errors?.mobileNumber}
              htmlFor="mobileNo"
            >
              <Input
                id="mobileNo"
                className={` input__Style`}
                size="large"
                placeholder="Enter your mobile number"
                value={userForm?.mobileNumber || ""}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  const truncatedValue = value.slice(0, 10); // Limit to 10 digits

                  setUserForm({
                    ...userForm,
                    mobileNumber: truncatedValue,
                  });
                  delete errors["mobileNumber"];
                }}
                disabled={
                  userForm?.userType === "customer" &&
                  openForm?.divType === "view"
                }
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Email ID"
              required
              validationMessage={errors?.email}
              htmlFor="email"
            >
              <Input
                id="email"
                className={` input__Style`}
                size="large"
                placeholder="Enter your email"
                value={userForm?.email || ""}
                onChange={(e) => handleChange(e, "email")}
                disabled={
                  userForm?.userType === "customer" ||
                  openForm?.divType === "view"
                }
                onBlur={() => {
                  if (userForm?.email) {
                    const isValid = Validation.emailValidation(userForm?.email);
                    if (!isValid) {
                      errors["email"] = "Please enter valid email address";
                    }
                  }
                }}
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="Start Date"
              validationMessage={errors?.startDate}
              htmlFor="startDate"
              required
            >
              <DatePickerComponent
                className={` input__Style`}
                size="large"
                value={
                  userForm?.startDate
                    ? new Date(userForm.startDate * 1000)
                    : null
                }
                handleChange={(e) => {
                  setUserForm({ ...userForm, startDate: new Date(e) / 1000 });
                  delete errors["startDate"];
                }}
                // maxDate={new Date(userForm?.endDate * 1000)}
                disabled={openForm?.divType === "view"}
              />
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              className={classes.label}
              label="End Date"
              validationMessage={errors?.endDate}
              htmlFor="endDate"
              required
            >
              <DatePickerComponent
                className={` input__Style`}
                minDate={new Date(userForm?.startDate * 1000)}
                size="large"
                value={
                  userForm?.endDate ? new Date(userForm.endDate * 1000) : null
                }
                handleChange={(e) => {
                  setUserForm({ ...userForm, endDate: new Date(e) / 1000 });
                  delete errors["endDate"];
                }}
                disabled={openForm?.divType === "view"}
              />
            </Field>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ProjectDetails;
