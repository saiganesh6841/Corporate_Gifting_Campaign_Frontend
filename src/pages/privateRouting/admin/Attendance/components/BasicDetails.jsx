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

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  errors,
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="box_container">
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={12}>
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
                  // disabled={isEdit}
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
                label="Check-in Time"
                required
                className={classes.label}
                validationMessage={errors?.userType}
              >
                <Input
                  className={` input__Style`}
                  type="time"
                  onChange={(e) => console.log(e.target.value)}
                />
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                label="Check-out Time"
                required
                className={classes.label}
                validationMessage={errors?.userType}
              >
                <Input className={` input__Style`} type="time" />
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
