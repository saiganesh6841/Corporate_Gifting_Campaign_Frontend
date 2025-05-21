import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { connect } from "react-redux";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import APIRequest from "../../../../../utils/APIRequest";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    paddingLeft: 10,
    paddingRigt: 10,
    marginTop: 60,
  },
  paper: {
    padding: 10,
    margin: 10,
    height: "100%",
  },
  backButton: {
    margin: 20,
  },
  userHeaderMargin: {
    marginTop: "-5%",
    position: "relative",
    left: "42%",
  },
  userTypeMenuItem: {
    minWidth: "50%",
    marginTop: "6px",
  },
  formGrid: {
    marginBottom: 10,
    paddingLeft: 10,
  },
}));
function AssignRole(props) {
  const classes = useStyles();
  const { isAssign, recordId, assigned, setAssigned } = props;

  const [unAssigned, setUnAssigned] = useState([]);

  useEffect(() => {
    getEditable();
  }, [isAssign]);

  const handleDualchange = (selected, value) => {
    setAssigned(selected);
  };

  const resetForm = () => {
    setAssigned([]);
    setUnAssigned([]);
  };

  const getEditable = () => {
    if (isAssign) {
      APIRequest.request(
        "POST",
        ConfigAPIURL.roleUnassigned,
        JSON.stringify({ roleId: recordId })
      ).then((response) => {
        if (response !== undefined && response !== null) {
          if (response.code === 100 && response.data.responseCode === 109) {
            setAssigned(response.data.admins);

            let employeeList = [];
            response.data.employees.map((employees) => {
              employeeList.push({
                label: employees?.fullName,
                value: employees._id,
              });
            });
            setUnAssigned(employeeList);
          }
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper className={classes.paper} elevation={1}>
            <Grid container>
              <Grid
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ textAlign: "center" }}
              >
                <h2>{props.t("role.assignRole")}</h2>
              </Grid>
              <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
                <DualListBox
                  icons={{
                    moveLeft: "<",
                    moveAllLeft: "<<",
                    moveRight: ">",
                    moveAllRight: ">>",
                  }}
                  options={unAssigned}
                  selected={assigned}
                  onChange={handleDualchange}
                />
              </Grid>
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
  connect(null, mapDispachToProps)(AssignRole)
);
