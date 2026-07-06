import { Stack } from "@fluentui/react";
import { Separator } from "@fluentui/react";
import { Dropdown, Field, Input, Option } from "@fluentui/react-components";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import useAevForm from "../hooks/useAevForm";
import { useStyles } from "../styles/style";
import AccessComponent from "./AccessComponent";
import PermissionComponent from "./PermissionComponent";
import roleImage from "../../../../../assets/Images/SnapFlow.png";
import { useTheme } from "@mui/styles";

function AEVForm(props) {
  const { openForm, recordId, addForm, setAddForm, addFormDetails, errors } =
    props;
  const theme = useTheme();
  const [selectLabel, setSelectLabel] = useState("User");
  const [showMicroPermissions, setShowMicroPermissions] = useState(false);

  const classes = useStyles();

  const { getRoleEditable } = useAevForm({ openForm });

  useEffect(() => {
    getRoleEditable(recordId, setAddForm);
  }, openForm?.divType);

  const resetForm = () => {
    setAddForm(addFormDetails);
  };

  const handlePermissionCheckChange = (event, labelIndex, index, type) => {
    let form = addForm;
    if (type === "permission") {
      form.permission[labelIndex].buttons[index].enable = event.target.checked;
    } else {
      form.microPermission[labelIndex].buttons[index].enable =
        event.target.checked;
    }

    setAddForm({ ...addForm }, form);
  };

  const handlePermissionChange = (event, labelIndex, type) => {
    let form;
    if (type === "permission") {
      form = [...addForm.permission];
    } else if (type === "microPermission") {
      form = [...addForm.microPermission];
    } else {
      return; // Handle unknown type or error if necessary
    }

    const data = form[labelIndex].buttons.map((val) => ({
      ...val,
      enable: event.target.checked,
    }));

    form[labelIndex].buttons = data;
    form[labelIndex].enable = event.target.checked;

    setAddForm({
      ...addForm,
      [type]: form,
    });
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "700",
            fontSize: "24px",
          }}
        >
          Edit Roles
        </Typography>
      </div>
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "40px" }}
        >
          <Paper className={classes.paper} elevation={1}>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xl={4}>
                  <Field className={classes.label} label="Role Name" required>
                    <Input
                      size="large"
                      className={`${classes.input} input__Style`}
                      placeholder=""
                      value={addForm?.name}
                      style={{
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        height: "49px",
                        marginTop: "8px",
                      }}
                      onChange={(e) =>
                        setAddForm({ ...addForm, name: e.target.value })
                      }
                      disabled={openForm?.divType === "view"}
                    />
                    {errors?.roleName && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errors?.roleName}
                      </span>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field label="Active">
                    <Dropdown
                      value={addForm?.active ? "yes" : "no"}
                      size="large"
                      style={{
                        textTransform: "capitalize",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        height: "49px",
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className={`${classes.input} input__Style`}
                      onOptionSelect={(e, data) => {
                        setAddForm({
                          ...addForm,
                          active: data?.optionValue === "yes" ? true : false,
                        });
                      }}
                      disabled={openForm?.divType === "view"}
                    >
                      <Option
                        style={{ textTransform: "capitalize" }}
                        text={true}
                        value={"yes"}
                      >
                        Yes
                      </Option>
                      <Option
                        style={{ textTransform: "capitalize" }}
                        text={false}
                        value={"no"}
                      >
                        No
                      </Option>
                    </Dropdown>
                  </Field>
                </Grid>
              </Grid>
              <Stack style={{ marginTop: "2rem", width: "100%" }}>
                <Separator
                  className="seperator"
                  style={{ margin: 0, padding: 0 }}
                />
                <Box className={classes.permissionsAccesContainer}>
                  <Box className={classes.permissionsContainer}>
                    <PermissionComponent
                      heading={"Permissions"}
                      permissions={addForm?.permission}
                      selectLabel={selectLabel}
                      onChange={(event, index) => {
                        handlePermissionChange(event, index, "permission");
                      }}
                      onClick={(permission) => {
                        setShowMicroPermissions(false);
                        setSelectLabel(permission?.label);
                      }}
                      disabled={openForm?.divType === "view"}
                    />
                    {/* <PermissionComponent
                      heading={"Micro Permissions"}
                      permissions={addForm?.microPermission}
                      selectLabel={selectLabel}
                      onChange={(event, index) => {
                        handlePermissionChange(event, index, "microPermission");
                      }}
                      onClick={(permission) => {
                        setShowMicroPermissions(true);
                        setSelectLabel(permission?.label);
                      }}
                    /> */}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <AccessComponent
                      selectLabel={selectLabel}
                      permissions={
                        showMicroPermissions
                          ? addForm?.microPermission
                          : addForm?.permission
                      }
                      onChange={(event, index, idx) =>
                        handlePermissionCheckChange(
                          event,
                          index,
                          idx,
                          "permission",
                        )
                      }
                      disabled={openForm?.divType === "view"}
                    />
                    <Box
                      sx={{
                        alignSelf: "center",
                        marginTop: "50px",
                      }}
                    >
                      {/* <img src={roleImage} width="250px" alt="roles" /> */}
                      <Typography
                        variant="h1"
                        style={{
                          fontWeight: 700,
                          fontSize: "1.5rem",
                          color: theme.palette.primary.main,
                        }}
                      >
                        Aayera
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispachToProps = (dispatch) => {
  return {
    publishNotification: (notification) =>
      dispatch({ type: "NOTIFICATION_OPEN", value: notification }),
  };
};
export default withTranslation("translations")(
  connect(null, mapDispachToProps)(AEVForm),
);
