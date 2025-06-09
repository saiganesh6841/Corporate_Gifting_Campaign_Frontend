import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import Typography from "../../../../../components/Text/Typography";
import SubscriptionCard from "./SubscriptionCard";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import ReusableDialog from "../../../../../components/dialog/ReusableDialog";
import RenewalModalContent from "./RenewalModalContent";
import noRatings from "../../../../../assets/images/noratingfoundimage.png";
import { Spinner } from "@fluentui/react";
function UserSubscription({ classes, onRenew, subscriptionList, services }) {
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

  const userSubscriptionDetails = services?.userSubscriptionDetails || {
    currentSubscription: null,
    historySubscription: [],
  };

  const { currentSubscription, historySubscription } =
    services?.userSubscriptionDetails;
  return (
    <>
      <Grid container spacing={2} className={classes.UserSubscriptionContainer}>
        <Grid
          item
          xs={12}
          className={classes?.subscriptionHeader}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="heading"
            style={{
              fontWeight: "700",
              color: "#000000",
              width: "50%",
            }}
          >
            Current Plan
          </Typography>
          <Typography
            variant="heading"
            style={{
              fontWeight: "700",
              color: "#000000",
              width: "50%",
            }}
          >
            Previous Plan
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            borderRight: "2px solid #EEEFF2",
            padding: "16px",
          }}
        >
          {currentSubscription ? (
            <SubscriptionCard
              isExpiryDate={true}
              amount={currentSubscription?.subscriptionId?.planAmount}
              totalAmount={currentSubscription?.subscriptionId?.totalAmount}
              accessChallenge={
                currentSubscription?.subscriptionId?.challengesAccess
              }
              planName={currentSubscription?.subscriptionId?.planName}
              expiryDate={currentSubscription?.expireAt}
              discountAmount={
                currentSubscription?.subscriptionId?.discountAmount
              }
              discountPercent={
                currentSubscription?.subscriptionId?.discountPercent
              }
            />
          ) : null}

          <Box className={classes.renewContainer}>
            <Box className={classes.renewTextContainer}>
              <Typography
                variant="subHeading"
                style={{
                  fontWeight: "600",
                  color: "#000000",
                }}
              >
                Renew plan
              </Typography>
              <Typography
                style={{
                  color: "#4C4F53",
                }}
              >
                Click Renew button to add plan
              </Typography>
            </Box>
            <FluentProvider theme={teamsLightTheme}>
              <Button
                className={classes.renewButton}
                onClick={() => {
                  services?.getAllSubscription();
                  services?.getDropdownChallenges();
                  setIsRenewModalOpen(true);
                }}
              >
                Renew
              </Button>
            </FluentProvider>
          </Box>
          {!currentSubscription && (
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
              <Typography variant="heading">No Current Plan </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={6} sx={{ padding: "12px" }}>
          {historySubscription.length > 0 ? (
            historySubscription.map((sub, index) => (
              <SubscriptionCard
                key={sub._id}
                isExpiryDate={true}
                amount={sub?.subscriptionId?.planAmount}
                accessChallenge={sub?.subscriptionId?.challengesAccess}
                totalAmount={sub?.subscriptionId?.totalAmount}
                planName={sub?.subscriptionId?.planName}
                expiryDate={sub?.expireAt}
                discountAmount={sub?.subscriptionId?.discountAmount}
                discountPercent={sub?.subscriptionId?.discountPercent}
              />
            ))
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
              <Typography variant="heading">No Previous Plans</Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <ReusableDialog
        padding={"20px"}
        isOpen={isRenewModalOpen}
        handleClose={() => {
          setIsRenewModalOpen(false);
        }}
        title="Subscriptions"
        buttonLabel="Save"
        NoSaveButton={true}
      >
        {services?.subscriptionList?.length > 0 ? (
          <RenewalModalContent
            classes={classes}
            subscriptionList={services?.subscriptionList || []}
            challengesList={services?.challengeDropdownList || []}
            services={services}
            closeModal={() => {
              setIsRenewModalOpen(false);
            }}
          />
        ) : (
          <Spinner />
        )}
      </ReusableDialog>
    </>
  );
}

export default UserSubscription;
