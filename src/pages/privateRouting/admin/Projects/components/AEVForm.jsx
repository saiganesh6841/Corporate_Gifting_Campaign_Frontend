import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import useAevForm from "../hooks/useAevForm";
import Typography from "../../../../../components/Text/Typogarphy";
import ProjectDetails from "./ProjectDetails";
import ProjectView from "./ProjectView";

const AEVForm = ({
  openForm,
  setOpenForm,
  classes,
  services,
  setQuery,
  query,
}) => {
  const theme = useTheme();

  const { userForm, setUserForm, editDeleteFloor, editDeleteFlat } = useAevForm(
    {
      openForm,
      services,
      setOpenForm,
    }
  );
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
          {(openForm?.divType === "add" || openForm?.divType === "edit") && (
            <BasicDetails
              {...{
                classes,
                setUserForm,
                userForm,
                openForm,
                errors: services?.errors,
                services,
                editDeleteFloor,
                editDeleteFlat,
              }}
            />
          )}

          {openForm?.divType === "view" && (
            <ProjectView
              classes={classes}
              openForm={openForm}
              userForm={userForm}
              services={services}
              setQuery={setQuery}
              query={query}
            />
          )}
        </Grid>
      </FluentProvider>
    </>
  );
};

export default AEVForm;
