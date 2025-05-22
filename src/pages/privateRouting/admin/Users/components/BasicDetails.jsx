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
} from "@fluentui/react-components";
import {
  Eye24Filled,
  EyeOff24Filled,
  ArrowCounterclockwiseRegular,
} from "@fluentui/react-icons";
import { Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoUploader from "../../../../../components/LogoUploader/LogoUploader";
import Reset from "../../../../../components/icons/Reset";
import utilController from "../../../../../utils/Utilcontroller";
import Validation from "../../../../../utils/Validation";

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
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

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
          <Input
            className={`input__Style`}
            size="large"
            placeholder="Select Usertype"
            value={utilController?.formatTextToCapitalize(
              userForm?.userType || "admin"
            )}
            // disabled={openForm?.divType === "edit"}
            disabled
          />
        </Field>
      </Grid>
      {userForm?.userType !== "customer" && (
        <Grid item xs={6}>
          <Field
            className={classes.label}
            label="Super Admin"
            required
            validationMessage={errors?.gender}
          >
            <Combobox
              id="isSuperAdmin"
              placeholder="Super Admin"
              size={"large"}
              className={"input__Style"}
              value={userForm?.isSuperAdmin ? "Yes" : "No"}
              disabled={openForm?.divType === "view"}
            >
              {["Yes", "No"]?.map((type) => (
                <Option
                  key={type}
                  onClick={() => {
                    let superPermission;

                    if (type === "Yes") {
                      console.log(roles, "datha");
                      superPermission = roles?.filter(
                        (per) => per.name === "Super Admin"
                      );
                    }
                    setUserForm({
                      ...userForm,
                      isSuperAdmin: type === "Yes" ? true : false,
                      permissionName: superPermission?.[0]?.name || "",
                      permission: superPermission?.[0]?._id || null,
                    });

                    delete errors["isSuperAdmin"];
                  }}
                >
                  {utilController?.formatTextToCapitalize(type)}
                </Option>
              ))}
            </Combobox>
          </Field>
        </Grid>
      )}

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
        <Field className={classes.label} label="Gender" htmlFor="gender">
          <Combobox
            id="gender"
            className={"input__Style"}
            size={"large"}
            placeholder="Gender"
            value={utilController?.formatTextToCapitalize(
              userForm?.gender || ""
            )}
            disabled={openForm?.divType === "view"}
          >
            {genders?.map((type) => (
              <Option
                key={type}
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

      {/* <Grid item xs={6}>
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
      </Grid> */}

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
              userForm?.userType === "customer" || openForm?.divType === "view"
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
      <Grid item xs={6}>
        <Field
          className={classes.label}
          label="Mobile Number"
          required
          validationMessage={errors?.mobileNo}
          htmlFor="mobileNo"
        >
          <Input
            id="mobileNo"
            className={` input__Style`}
            size="large"
            placeholder="Enter your mobile number"
            value={userForm?.mobileNo || ""}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              const truncatedValue = value.slice(0, 10); // Limit to 10 digits

              setUserForm({
                ...userForm,
                mobileNo: truncatedValue,
              });
              delete errors["mobileNo"];
            }}
            disabled={
              userForm?.userType === "customer" && openForm?.divType === "view"
            }
          />
        </Field>
      </Grid>

      {userForm?.userType !== "customer" && (
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
              className={` input__Style`}
              size="large"
              placeholder="Select Role"
              value={
                // userForm.permission
                //   ? roles.find((role) => role._id === userForm.permission)
                //       ?.name || ""
                //   : ""

                userForm?.permissionName || ""
              }
              onClick={() => {
                fetchRoles();
              }}
              disabled={openForm?.divType === "view" || userForm?.isSuperAdmin}
            >
              {roles?.map((option) => (
                <Option
                  key={option._id}
                  onClick={() => {
                    setUserForm({
                      ...userForm,
                      permissionName: option?.name,
                      permission: option?._id,
                    });
                    delete errors["permission"];
                  }}
                >
                  <p style={{ textTransform: "capitalize", margin: "4px" }}>
                    {option.name}
                  </p>
                </Option>
              ))}
            </Combobox>
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
          <Grid style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Input
              id="password"
              className="input__Style"
              size="large"
              style={{ width: "280px" }}
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={userForm?.password || ""}
              onChange={(e) => handleChange(e, "password")}
              contentAfter={
                <Button
                  appearance="subtle"
                  icon={showPassword ? <Eye24Filled /> : <EyeOff24Filled />}
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
            <span style={{ display: "flex", alignItems: "center" }}>
              <ArrowCounterclockwiseRegular />
            </span>
          </Grid>
          {userForm?.userType !== "customer" && (
            <Text
              weight="semibold"
              style={{
                color: "#0F62FE",
                cursor: "pointer",
                visibility: openForm?.divType === "edit" ? "visible" : "hidden",
              }}
              onClick={() => resetPasswordAttempts()}
            >
              Password Attempt Reset
            </Text>
          )}
        </Field>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
