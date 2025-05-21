import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@fluentui/react-components";
import { Grid } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    textAlign: "end",
  },
}));
function AddRole(props) {
  const {
    addRoleObject,
    setAddRoleObject,
    handleClose,
    open,
    addRole,
    errors,
    setErrors,
  } = props;
  const classes = useStyles();

  const theme = useTheme();

  return (
    <Dialog open={open}>
      <DialogSurface>
        <DialogTitle>Create Role</DialogTitle>
        <DialogBody>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid
                style={{
                  display: "flex",
                  width: "100%",
                  margin: "20px",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Grid item xs={12}>
                  <Field
                    label="Role Name"
                    required
                    className={classes.label}
                    validationMessage={errors}
                  >
                    <Input
                      required
                      autoFocus
                      id="name"
                      autoComplete="off"
                      label="roleName"
                      className={`${classes.input} input__Style`}
                      type="text"
                      fullWidth
                      value={addRoleObject.name}
                      onChange={(event) => {
                        setAddRoleObject({
                          ...addRoleObject,
                          name: event.target.value,
                        });
                        setErrors("");
                      }}
                      style={{ height: "49px" }}
                    />
                  </Field>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: "20px" }}>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={() => handleClose()}>
                Close
              </Button>
            </DialogTrigger>
            <button
              // appearance="primary"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                border: "none",
                borderRadius: "3px",
                width: "99px",
                cursor: "pointer",
              }}
              onClick={() => addRole()}
            >
              Create Role
            </button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
const mapDispachToProps = (dispatch) => {
  return {
    publishNotification: (notification) =>
      dispatch({ type: "NOTIFICATION_OPEN", value: notification }),
  };
};
export default withTranslation("translations")(
  connect(null, mapDispachToProps)(AddRole)
);
