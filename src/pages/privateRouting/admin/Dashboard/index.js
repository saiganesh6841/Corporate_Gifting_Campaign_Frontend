/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";

import { Separator } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import {
  Cart24Filled,
  DocumentOnePage24Filled,
  PeopleTeam24Filled,
} from "@fluentui/react-icons";
import { useTheme } from "@mui/styles";
import { connect } from "react-redux";
import Header from "../../../../components/HeaderUi/Index";
import Typography from "../../../../components/Text/Typography";
import BarGraph from "./components/BarGraph";
import GraphHeader from "./components/GraphHeader";
import RevenueSection from "./components/RevenueSection";
import StatisticsCard from "./components/StatisticsCard";
import useServices from "./hooks/useServices";
import { useStyles } from "./styles/style";
import LocalStorage from "../../../../config/LocalStorage";

const statsConstData = [
  {
    color: "linear-gradient(to right, #005CEA, #12B1DE)",
    label: "Users",
    icon: <PeopleTeam24Filled style={{ color: "#ffff" }} />,
  },
  {
    color: "linear-gradient(to right, #F84E6B, #F67086)",
    label: "Plans",
    icon: <DocumentOnePage24Filled style={{ color: "#ffff" }} />,
  },
  {
    color: "linear-gradient(to right, #F66B2F, #EFA55F)",
    label: "Subscriptions",
    icon: <Cart24Filled style={{ color: "#ffff" }} />,
  },
]; //constant

const graphFilter = {
  dateType: "week", //year , day , month , week
  module: "users", // orders
  startDate: null,
  endDate: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
}; //constant

const pieChartFilter = {
  startDate: null,
  endDate: Math.floor(new Date().setHours(23, 59, 0, 0) / 1000),
};
//constant
function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [graphFiltersData, setGraphFiltersData] = useState({ ...graphFilter });
  const [pieChartFiltersData, setPieChartFiltersData] = useState({
    ...pieChartFilter,
  });

  const services = useServices({ graphFiltersData, pieChartFiltersData });

  return (
    <div
      className={classes.root}
      style={{
        overflowY: "scroll",
      }}
    >
      <Header classes={classes} />
      <div className={classes.spaceBetween}>
        {/* heading of the dash board */}
        <FluentProvider theme={teamsLightTheme}>
          <div className={classes.dashboardHeading}>
            <Typography
              variant="title"
              style={{
                fontWeight: "600",
              }}
            >
              Hi{" "}
              <span
                style={{
                  color: theme?.palette?.primary?.main,
                }}
              >
                {LocalStorage.userDetails?.name}
              </span>
              , Welcome back
            </Typography>
            <Typography
              style={{
                color: "#868686",
                fontWeight: "400",
                marginTop: "8px",
              }}
            >
              Let's take a look at some comprehensive statistics about the
              application
            </Typography>
          </div>
          {/* main dashboard  */}

          <Box className={classes.mainDashboardContainer}>
            <Box className={classes.dashBoardStatAndGraphContainer}>
              <Box className={classes.statastics}>
                {services?.statisticsData?.map((data, i) => (
                  <StatisticsCard
                    classes={classes}
                    background={statsConstData?.[i]?.color}
                    Icon={statsConstData?.[i]?.icon}
                    label={statsConstData?.[i]?.label}
                    totalNumber={data?.Counts || "0"}
                    newlyAddedCount={data?.newlyCreatedCount || "0"}
                  />
                ))}
              </Box>
              <Separator
                className="seperator"
                style={{ margin: 0, padding: 0, marginTop: "8px" }}
              />
              <Box
                sx={{
                  marginBottom: "24px",
                }}
              >
                <GraphHeader
                  graphFiltersData={graphFiltersData}
                  setGraphFiltersData={setGraphFiltersData}
                />
              </Box>

              {/* bar graph */}
              <BarGraph
                color={theme?.palette?.primary?.main}
                services={services}
                graphFiltersData={graphFiltersData}
              />
            </Box>
            <Box className={classes.totalRevenueContainer}>
              <RevenueSection
                setPieChartFiltersData={setPieChartFiltersData}
                pieChartFiltersData={pieChartFiltersData}
                services={services}
                classes={classes}
              />
            </Box>
          </Box>
        </FluentProvider>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    shortcutKeyValue: state.shortcutKeyValue,
    sideDrawerData: state.sideDrawerData,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    shortcutKey: (shortcutKeyValue) =>
      dispatch({ type: "SHORTCUTKEY", value: shortcutKeyValue }),
    publishNotification: (notification) =>
      dispatch({ type: "NOTIFICATION_OPEN", value: notification }),
  };
};
export default withTranslation("translations")(
  connect(mapStateToProps, mapDispachToProps)(Dashboard)
);
