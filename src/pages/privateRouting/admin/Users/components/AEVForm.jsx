import { Stack } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Box, Grid, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import noRatings from "../../../../../assets/images/noratingfoundimage.png";
import Typography from "../../../../../components/Text/Typography";
import BasicDetails from "./BasicDetails";
import UserRatings from "./UserRatings";
import UserSubscription from "./UserSubscription";
import useAevForm from "../hooks/useAevForm";

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
  // const {
  //   classes,
  //   openForm,
  //   roles,
  //   fetchRoles,
  //   errors,
  //   resetPasswordAttempts,
  //   userRatings,
  //   subscriptionList,
  // } = props;
  const { userForm, setUserForm } = useAevForm({
    openForm,
    services,
    setOpenForm,
  });

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <Stack>
          <Typography variant="title">
            {openForm?.divType === "add"
              ? "Create User"
              : openForm?.divType === "edit"
              ? "Edit User"
              : "View User"}
          </Typography>
        </Stack>

        {userForm?.userType === "customer" && openForm?.divType === "edit" && (
          <Tabs>
            {tabListValues?.map((tab) => (
              <Tab
                label={tab?.label}
                onClick={() => setTabList(tab?.value)}
                sx={{
                  color:
                    tabList === tab?.value ? theme?.palette?.primary?.main : "",
                  borderBottom:
                    tabList === tab?.value
                      ? `2px solid ${theme?.palette?.primary?.main}`
                      : "",
                  fontWeight: tabList === tab?.value ? 700 : "",
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
              />
            ))}
          </Tabs>
        )}

        <Grid container className={`${classes.distinct} ${classes.gapMedium}`}>
          {tabList === "basic" && (
            <BasicDetails
              {...{
                classes,
                setUserForm,
                userForm,
                openForm,
                roles: services?.roles,
                fetchRoles: services?.fetchRoles,
                errors: services?.errors,
                resetPasswordAttempts: services?.resetPasswordAttempts,
              }}
            />
          )}
        </Grid>

        {tabList === "subscription" && (
          <UserSubscription
            classes={classes}
            subscriptionList={services?.subscriptionList}
            services={services}
          />
        )}

        {tabList === "ratings" &&
          (services?.userRatings?.length > 0 ? (
            <>
              {services?.userRatings?.map((userRating, index) => (
                <UserRatings
                  key={index}
                  profileImage={userForm?.profileImage}
                  name={userForm?.fullName}
                  ratings={userRating?.rating || 0}
                  comment={userRating?.comment || ""}
                  createdRatingTime={userRating?.createdAt}
                />
              ))}
            </>
          ) : (
            <Box className={classes.noRatingsContainer}>
              <img
                src={noRatings}
                alt="no ratings illustration"
                style={{
                  width: "200px",
                  height: "150px",
                  marginBottom: "20px",
                }}
              />
              <Typography variant="heading">
                No Feedbacks Registered Yet
              </Typography>
            </Box>
          ))}
      </FluentProvider>
    </>
  );
};

export default AEVForm;
