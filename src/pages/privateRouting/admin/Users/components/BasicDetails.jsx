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
  Textarea,
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
            logoUrl={userForm?.profileImage}
            onUpload={(url) => setUserForm({ ...userForm, profileImage: url })}
            error={errors}
          />
        </Stack>
      </Grid>

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
                  // disabled={isEdit}
                >
                  {["admin", "HR", "vendor"].map((type) => (
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

            {userForm?.userType === "HR" && (
              <Grid item xs={6}>
                <Field
                  className={classes.label}
                  label="Select Organization"
                  required
                  validationMessage={
                    errors?.organizationId
                      ? "Organization field is required"
                      : ""
                  }
                  htmlFor="organizationId"
                >
                  <Combobox
                    id="organizationId"
                    className={`input__Style`}
                    size="medium"
                    placeholder="Select Organization"
                    value={userForm?.organizationName || ""}
                    onChange={(e) => {
                      setUserForm({
                        ...userForm,
                        organizationName: e.target.value,
                      });

                      fetchOrganizations(e.target.value);
                    }}
                    onOptionSelect={(_, data) => {
                      const selectedOption = organizations.find(
                        (org) => org._id === data.optionValue,
                      );
                      setUserForm({
                        ...userForm,
                        organizationId: selectedOption?._id,
                        organizationName: selectedOption?.name,
                      });
                      delete errors["organizationId"];
                    }}
                    onClick={() => {
                      fetchOrganizations();
                    }}
                    disabled={
                      openForm?.divType === "view" || userForm?.isSuperAdmin
                    }
                  >
                    {organizations?.map((option) => (
                      <Option
                        key={option._id}
                        value={option._id}
                        text={option?.name}
                      >
                        <p
                          style={{ textTransform: "capitalize", margin: "4px" }}
                        >
                          {option.name}
                        </p>
                      </Option>
                    ))}
                  </Combobox>
                </Field>
              </Grid>
            )}
            <Grid item xs={6}>
              <Field className={classes.label} label="Gender" htmlFor="gender">
                <Combobox
                  id="gender"
                  className={"input__Style"}
                  style={{ fontSize: "14px" }}
                  size={"medium"}
                  placeholder="Gender"
                  value={utilController?.formatTextToCapitalize(
                    userForm?.gender || "",
                  )}
                  disabled={openForm?.divType === "view"}
                >
                  {genders?.map((type) => (
                    <Option
                      key={type}
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        setUserForm({
                          ...userForm,
                          gender: type,
                        });
                      }}
                    >
                      {utilController?.formatTextToCapitalize(type)}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Date of Birth"
                validationMessage={errors?.dob}
                htmlFor="dob"
              >
                <DatePickerComponent
                  className={` input__Style`}
                  size="large"
                  value={userForm?.dob ? new Date(userForm.dob * 1000) : null}
                  handleChange={(e) =>
                    setUserForm({ ...userForm, dob: new Date(e) / 1000 })
                  }
                  maxDate={new Date()}
                  disabled={openForm?.divType === "view"}
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
                label="Role"
                required
                validationMessage={
                  errors?.permission ? "Role field is required" : ""
                }
                htmlFor="permission"
              >
                <Combobox
                  id="permission"
                  className={`input__Style`}
                  size="medium"
                  placeholder="Select Role"
                  value={userForm?.permissionName || ""}
                  onOptionSelect={(_, data) => {
                    const selectedOption = roles.find(
                      (r) => r._id === data.optionValue,
                    );
                    setUserForm({
                      ...userForm,
                      permission: selectedOption?._id,
                      permissionName: selectedOption?.name,
                    });
                    delete errors["permission"];
                  }}
                  onClick={() => {
                    fetchRoles();
                  }}
                  disabled={
                    openForm?.divType === "view" || userForm?.isSuperAdmin
                  }
                >
                  {roles?.map((option) => (
                    <Option
                      key={option._id}
                      value={option._id}
                      text={option?.name}
                    >
                      <p style={{ textTransform: "capitalize", margin: "4px" }}>
                        {option.name}
                      </p>
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>
            {userForm?.userType === "vendor" && (
              <Grid item xs={6}>
                <Field
                  className={classes.label}
                  label="Warehouse Pincode"
                  required
                  validationMessage={errors?.warehousePincode}
                  htmlFor="warehousePincode"
                >
                  <Input
                    id="warehousePincode"
                    className={` input__Style`}
                    size="large"
                    placeholder="Enter your Warehouse Pincode"
                    value={userForm?.warehousePincode || ""}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      const truncatedValue = value.slice(0, 6); // Limit to 10 digits

                      setUserForm({
                        ...userForm,
                        warehousePincode: truncatedValue,
                      });
                      delete errors["warehousePincode"];
                    }}
                    onBlur={() => {
                      if (userForm?.warehousePincode) {
                        if (userForm.warehousePincode.length < 6) {
                          errors["warehousePincode"] =
                            "Warehouse Pincode must be at least 6 digits";
                        } else {
                          delete errors["warehousePincode"];
                        }
                      }
                    }}
                  />
                </Field>
              </Grid>
            )}
            {userForm?.userType === "vendor" && (
              <Grid item xs={12}>
                <Field
                  className={classes.label}
                  label="Warehouse Address"
                  validationMessage={errors?.warehouseAddress}
                  required
                  htmlFor="warehouseAddress"
                >
                  <Textarea
                    id="warehouseAddress"
                    // className={"input__Style"}
                    size={"large"}
                    placeholder="Add a Complete warehouse address"
                    resize="vertical"
                    rows={3}
                    value={userForm?.warehouseAddress || ""}
                    onChange={(e) => handleChange(e, "warehouseAddress")}
                    // disabled={isViewMode}
                    onBlur={handleBlur("warehouseAddress")}
                  />
                </Field>
              </Grid>
            )}

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Password"
                required
                validationMessage={errors?.password}
                htmlFor="password"
              >
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <Input
                    id="password"
                    className="input__Style"
                    size="large"
                    style={{ width: "250px" }}
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur("password")}
                    value={userForm?.password || ""}
                    onChange={(e) => handleChange(e, "password")}
                    contentAfter={
                      <Button
                        appearance="subtle"
                        icon={
                          showPassword ? <Eye24Filled /> : <EyeOff24Filled />
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="Toggle password visibility"
                      />
                    }
                    disabled={
                      userForm?.userType === "customer" ||
                      openForm?.divType === "view"
                    }
                  />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {userForm?.userType !== "customer" && (
                      <IconButton
                        aria-label="generate random password"
                        onClick={handleGeneratePassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <Reset />
                      </IconButton>
                    )}
                  </span>
                </Grid>
                <Text
                  weight="semibold"
                  style={{
                    color: "#0F62FE",
                    cursor: "pointer",
                    visibility:
                      openForm?.divType === "edit" ? "visible" : "hidden",
                  }}
                  onClick={() => resetPasswordAttempts()}
                >
                  Password Attempt Reset
                </Text>
                {/* )} */}
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
