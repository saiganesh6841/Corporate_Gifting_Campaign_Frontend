import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import useAevForm from "../hooks/useAevForm";
import Typography from "../../../../../components/Text/Typogarphy";
import AttendanceInformation from "./AttendanceInformation";
import AttendanceDetails from "./AttendanceDetails";
import AttendanceCalendar from "./Calendar";

const tabListValues = [
  {
    value: "basic",
    label: "Basic Details",
  },
];

const statusMap = {
  "2025-09-01": "Present",
  "2025-09-03": "Absent",
  "2025-09-05": "Late",
  "2025-09-08": "Overtime",
  "2025-09-16": "Late",
  "2025-09-19": "Overtime",
};

const AEVForm = ({ openForm, setOpenForm, classes, services }) => {
  const theme = useTheme();
  const [tabList, setTabList] = useState("basic");

  const { userForm, setUserForm } = useAevForm({
    openForm,
    services,
    setOpenForm,
  });

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <Grid
          container
          className={`${classes.distinct} ${classes.gapMedium}`}
          style={{
            marginTop: "12px",
            gap: "16px",
          }}
        >
          <Grid item xs={12} spacing={2}>
            <AttendanceInformation classes={classes} />
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={7}>
              <AttendanceCalendar statusMap={statusMap} />
            </Grid>
            <Grid item xs={5}>
              <AttendanceDetails classes={classes} />
            </Grid>
          </Grid>
          {/* <BasicDetails
            {...{
              classes,
              setUserForm,
              userForm,
              openForm,
              errors: services?.errors,
            }}
          /> */}
        </Grid>
      </FluentProvider>
    </>
  );
};

export default AEVForm;
