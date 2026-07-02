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
  organizations,
  fetchOrganizations,
  errors,
  resetPasswordAttempts,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const generateRandomPassword = () => {
    const length = 8; // Length of the generated password
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"; // Characters to choose from
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    return password;
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword();
    setUserForm({
      ...userForm,
      password: generatedPassword,
    });
    setPassword(generatedPassword);
  };

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
  console.log(openForm);
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <Stack
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LogoUploader
            logoUrl={userForm?.profileImage}
            onUpload={(url) => setUserForm({ ...userForm, profileImage: url })}
            error={errors}
          />
        </Stack>
      </Grid> */}

      <Grid item xs={12}>
        <Box className="box_container">
          <SectionHeading
            title="Basic Details"
            classes={classes}
            theme={theme}
          />
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={6}>
              <Field className={classes.label} label="User ID">
                <Input
                  appearance="outline"
                  className={`input__Style`}
                  size="large"
                  value={userForm?.userId || "auto"}
                  disabled
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="User Type"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  // className={`${classes.input} input__Style`}
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                  disabled
                  // disabled={isEdit}
                >
                  {["HR"].map((type) => (
                    <Option
                      key={type}
                      onClick={() => {
                        setUserForm((p) => ({
                          ...p,
                          userType: type,
                        }));
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Option>
                  ))}
                </Dropdown>
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
                  onBlur={handleBlur("fullName")}
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
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
                    openForm?.divType === "view" ||
                    openForm?.divType === "edit"
                  }
                  onBlur={() => {
                    if (userForm?.email) {
                      const isValid = Validation.emailValidation(
                        userForm?.email,
                      );
                      if (!isValid) {
                        errors["email"] = "Please enter valid email address";
                      }
                    }
                  }}
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
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
                  onBlur={() => {
                    if (userForm?.mobileNumber) {
                      if (userForm.mobileNumber.length < 10) {
                        errors["mobileNumber"] =
                          "Mobile number must be at least 10 digits";
                      } else {
                        delete errors["mobileNumber"];
                      }
                    }
                  }}
                  disabled={
                    userForm?.userType === "customer" ||
                    openForm?.divType === "view" ||
                    openForm?.divType === "edit"
                  }
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Department"
                validationMessage={
                  errors?.department ? "Department field is required" : ""
                }
                htmlFor="department"
              >
                <Input
                  id="department"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter your department"
                  value={userForm?.department || ""}
                  onChange={(e) => handleChange(e, "department")}
                  disabled={openForm?.divType === "view"}
                  onBlur={handleBlur("department")}
                />
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field
                className={classes.label}
                label="Address"
                validationMessage={
                  errors?.address ? "Address field is required" : ""
                }
                htmlFor="address"
              >
                <Input
                  id="address"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter your address"
                  value={userForm?.address || ""}
                  onChange={(e) => handleChange(e, "address")}
                  disabled={openForm?.divType === "view"}
                  onBlur={handleBlur("address")}
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="City"
                validationMessage={errors?.city ? "City field is required" : ""}
                htmlFor="city"
              >
                <Input
                  id="city"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter your city"
                  value={userForm?.city || ""}
                  onChange={(e) => handleChange(e, "city")}
                  disabled={openForm?.divType === "view"}
                  onBlur={handleBlur("city")}
                />
              </Field>
            </Grid>{" "}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="State"
                validationMessage={
                  errors?.state ? "State field is required" : ""
                }
                htmlFor="state"
              >
                <Input
                  id="state"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter your state"
                  value={userForm?.state || ""}
                  onChange={(e) => handleChange(e, "state")}
                  disabled={openForm?.divType === "view"}
                  onBlur={handleBlur("state")}
                />
              </Field>
            </Grid>{" "}
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Pincode"
                validationMessage={
                  errors?.pincode ? "Pincode field is required" : ""
                }
                htmlFor="pincode"
              >
                <Input
                  id="pincode"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter your pincode"
                  value={userForm?.pincode || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    const truncatedValue = value.slice(0, 6); // Limit to 10 digits

                    setUserForm({
                      ...userForm,
                      pincode: truncatedValue,
                    });
                    delete errors["pincode"];
                  }}
                  disabled={openForm?.divType === "view"}
                  onBlur={handleBlur("pincode")}
                />
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
