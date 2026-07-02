import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import useAevForm from "../hooks/useAevForm";
import Typography from "../../../../../components/Text/Typogarphy";

const tabListValues = [
  {
    value: "basic",
    label: "Basic Details",
  },
  // {
  //   value: "subscription",
  //   label: "Subscription",
  // },
  {
    value: "ratings",
    label: "Ratings & Feedback",
  },
];

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
          }}
        >
          {tabList === "basic" && (
            <BasicDetails
              {...{
                classes,
                setOrgForm:setUserForm,
                orgForm:userForm,
                openForm,
                errors: services?.errors,
              }}
            />
          )}
        </Grid>
      </FluentProvider>
    </>
  );
};

export default AEVForm;
