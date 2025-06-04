import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import useAevForm from "../hooks/useAevForm";
import Typography from "../../../../../components/Text/Typogarphy";
import ProjectBar from "./ProjectBar";

const AEVForm = ({ openForm, setOpenForm, classes, services }) => {
  const theme = useTheme();

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
          }}
        >
          <Grid item xs={12}>
            <ProjectBar classes={classes} />
          </Grid>
          <BasicDetails
            {...{
              classes,
              setUserForm,
              userForm,
              openForm,
              errors: services?.errors,
              services,
            }}
          />
        </Grid>
      </FluentProvider>
    </>
  );
};

export default AEVForm;
