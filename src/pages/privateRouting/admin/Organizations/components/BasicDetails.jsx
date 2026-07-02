import { Stack } from "@fluentui/react";
import { Field, Input, Option, Combobox } from "@fluentui/react-components";
import { Box, Grid } from "@mui/material";
import React from "react";
import LogoUploader from "../../../../../components/LogoUploader/LogoUploader";
import Validation from "../../../../../utils/Validation";
import { useTheme } from "@mui/styles";
import SectionHeading from "../../../../../components/SectionHeader/Index";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function BasicDetails({ classes, setOrgForm, orgForm, openForm, errors }) {
  const theme = useTheme();

  const handleChange = (event, name) => {
    if (!name) return;
    const { value } = event.target;
    setOrgForm({
      ...orgForm,
      [name]: value,
    });
    delete errors[name];
  };

  const handleBlur = (field) => (e) => {
    const trimmedValue = e.target.value.trim();

    setOrgForm((p) => ({
      ...p,
      [field]: trimmedValue,
    }));
  };

  const isViewMode = openForm?.divType === "view";
  const isEditMode = openForm?.divType === "edit";

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
          {/* For uploading the organization logo */}
          <LogoUploader
            logoUrl={orgForm?.logo}
            onUpload={(url) => setOrgForm({ ...orgForm, logo: url })}
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
              <Field className={classes.label} label="Organization ID">
                <Input
                  appearance="outline"
                  className={`input__Style`}
                  size="large"
                  value={orgForm?.orgId || "auto"}
                  disabled
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Organization Name"
                required
                validationMessage={
                  errors?.name ? "Organization Name field is required" : ""
                }
                htmlFor="name"
              >
                <Input
                  id="name"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter organization name"
                  value={orgForm?.name || ""}
                  onChange={(e) => handleChange(e, "name")}
                  disabled={isViewMode}
                  onBlur={handleBlur("name")}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Contact Person Name"
                validationMessage={errors?.contactPersonName}
                htmlFor="contactPersonName"
              >
                <Input
                  id="contactPersonName"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter contact person name"
                  value={orgForm?.contactPersonName || ""}
                  onChange={(e) => handleChange(e, "contactPersonName")}
                  disabled={isViewMode}
                  onBlur={handleBlur("contactPersonName")}
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
                  placeholder="Enter organization email"
                  value={orgForm?.email || ""}
                  onChange={(e) => handleChange(e, "email")}
                  disabled={isViewMode || isEditMode}
                  onBlur={() => {
                    if (orgForm?.email) {
                      const isValid = Validation.emailValidation(
                        orgForm?.email,
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
                  placeholder="Enter mobile number"
                  value={orgForm?.mobileNumber || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    const truncatedValue = value.slice(0, 10);

                    setOrgForm({
                      ...orgForm,
                      mobileNumber: truncatedValue,
                    });
                    delete errors["mobileNumber"];
                  }}
                  onBlur={() => {
                    if (orgForm?.mobileNumber) {
                      if (orgForm.mobileNumber.length < 10) {
                        errors["mobileNumber"] =
                          "Mobile number must be at least 10 digits";
                      } else {
                        delete errors["mobileNumber"];
                      }
                    }
                  }}
                  disabled={isViewMode}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="GST Number"
                validationMessage={errors?.gstNumber}
                htmlFor="gstNumber"
              >
                <Input
                  id="gstNumber"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter GST number"
                  value={orgForm?.gstNumber || ""}
                  onChange={(e) => handleChange(e, "gstNumber")}
                  disabled={isViewMode}
                  onBlur={handleBlur("gstNumber")}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Address"
                validationMessage={errors?.address}
                htmlFor="address"
                required
              >
                <Input
                  id="address"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter address"
                  value={orgForm?.address || ""}
                  onChange={(e) => handleChange(e, "address")}
                  disabled={isViewMode}
                  onBlur={handleBlur("address")}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="City"
                validationMessage={errors?.city}
                htmlFor="city"
                required
              >
                <Input
                  id="city"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter city"
                  value={orgForm?.city || ""}
                  onChange={(e) => handleChange(e, "city")}
                  disabled={isViewMode}
                  onBlur={handleBlur("city")}
                />
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="State"
                htmlFor="state"
                required
              >
                <Combobox
                  id="state"
                  className={"input__Style"}
                  style={{ fontSize: "14px" }}
                  size={"medium"}
                  placeholder="Select state"
                  value={orgForm?.state || ""}
                  disabled={isViewMode}
                >
                  {indianStates.map((state) => (
                    <Option
                      key={state}
                      style={{ fontSize: "14px" }}
                      onClick={() => {
                        setOrgForm({
                          ...orgForm,
                          state: state,
                        });
                      }}
                    >
                      {state}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Pincode"
                validationMessage={errors?.pincode}
                htmlFor="pincode"
              >
                <Input
                  id="pincode"
                  className={"input__Style"}
                  size={"large"}
                  placeholder="Enter pincode"
                  value={orgForm?.pincode || ""}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    const truncatedValue = value.slice(0, 6);

                    setOrgForm({
                      ...orgForm,
                      pincode: truncatedValue,
                    });
                    delete errors["pincode"];
                  }}
                  onBlur={() => {
                    if (orgForm?.pincode) {
                      if (orgForm.pincode.length < 6) {
                        errors["pincode"] = "Pincode must be 6 digits";
                      } else {
                        delete errors["pincode"];
                      }
                    }
                  }}
                  disabled={isViewMode}
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
