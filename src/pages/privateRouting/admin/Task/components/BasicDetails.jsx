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

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  errors,
}) {
  const theme = useTheme();
  const [fields, setFields] = useState([{ value: "" }, { value: "" }]);
  const handleChange = (index, value) => {
    const updated = [...fields];
    updated[index].value = value;
    setFields(updated);
  };

  const handleAdd = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleRemove = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="box_container">
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Project"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                >
                  {["admin", "worker", "supervisor"].map((type) => (
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
                label="Select Floor"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                >
                  {["admin", "worker", "supervisor"].map((type) => (
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
                label="Select Room"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                >
                  {["admin", "worker", "supervisor"].map((type) => (
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
                label="Select Flat"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                >
                  {["admin", "worker", "supervisor"].map((type) => (
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
                label="Select Worker"
                required
                validationMessage={errors?.userType}
              >
                <Dropdown
                  className={` input__Style`}
                  size="medium"
                  value={
                    userForm?.userType
                      ? userForm?.userType.charAt(0).toUpperCase() +
                        userForm?.userType.slice(1)
                      : ""
                  }
                >
                  {["admin", "worker", "supervisor"].map((type) => (
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
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className="box_container">
          {/* {fields?.map((val, index) => (
            <Stack horizontal >
              <Box>{index + 1}</Box>
              <Input />
              <Delete16Filled />
            </Stack>
          ))} */}
          <Grid container spacing={2} style={{ padding: "10px" }}>
            {fields?.map((val, index) => (
              <Grid item xs={12} key={index}>
                <Stack
                  direction="row"
                  alignItems="center"
                  horizontal
                  spacing={2}
                  gap={8}
                  sx={{ width: "100%" }}
                >
                  {/* Circular Number */}
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#fdecea",
                      color: "#5a1a16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>

                  {/* Input Field */}
                  <Input fullWidth placeholder="ABC" style={{ flexGrow: 1 }} />

                  {/* Delete Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Delete16Filled
                      sx={{ color: "#5a1a16", cursor: "pointer" }}
                    />
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "end", padding: "10px" }}>
            <PrimaryBtn style={{ width: "100px" }}>Add</PrimaryBtn>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
