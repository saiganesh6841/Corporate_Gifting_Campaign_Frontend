/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useState } from "react";

import { Separator } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import {
  Cart24Filled,
  DocumentOnePage24Filled,
  PeopleTeam24Filled,
} from "@fluentui/react-icons";
import { useTheme } from "@mui/styles";
import Header from "../../../../components/HeaderUi/Index";
import BarGraph from "./components/BarGraph";
import GraphHeader from "./components/GraphHeader";
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
      <Header classes={classes} text="Dashboard" />

      <div className={classes.spaceBetween}>
        <FluentProvider theme={teamsLightTheme}>
          {/* main dashboard  */}

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
          <Box className={classes.mainDashboardContainer}>
            <Box className={classes.dashBoardStatAndGraphContainer}>
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
          </Box>
        </FluentProvider>
      </div>
    </div>
  );
}

export default Dashboard;
