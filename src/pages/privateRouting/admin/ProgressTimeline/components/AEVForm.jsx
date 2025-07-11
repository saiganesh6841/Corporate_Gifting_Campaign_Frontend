import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import useAevForm from "../hooks/useAevForm";
import Typography from "../../../../../components/Text/Typogarphy";
import ProjectBar from "./ProjectBar";
import ShowProgress from "./ShowProgress";

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
          {userForm?.projectId && (
            <Grid item xs={12}>
              <ProjectBar userForm={userForm} classes={classes} />
            </Grid>
          )}
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

          <hr style={{ width: "100%" }} />
          <Box sx={{ overflow: "scroll" }} className="hide-y-scrollbar">
            <ShowProgress
              classes={classes}
              progressData={services?.progressData}
              setUserForm={setUserForm}
              userForm={userForm}
            />
          </Box>
        </Grid>
      </FluentProvider>
    </>
  );
};

export default AEVForm;
