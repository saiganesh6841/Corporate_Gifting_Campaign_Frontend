/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Separator } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import {
  Document24Regular,
  DocumentBulletList24Regular,
  DocumentCheckmark24Regular,
  People24Regular,
} from "@fluentui/react-icons";
import { useTheme } from "@mui/styles";
import Header from "../../../../components/HeaderUi/Index";
import BarGraph from "./components/BarGraph";
import GraphHeader from "./components/GraphHeader";
import StatisticsCard from "./components/StatisticsCard";
import useServices from "./hooks/useServices";
import { useStyles } from "./styles/style";
import LocalStorage from "../../../../config/LocalStorage";
import AreaGraph from "./components/AreaGraph";

const graphFilter = {
  dateType: "month", //year , day , month , week
  module: "projects", // orders
  startDate: 1746085108,
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
  const [statsConstData, setStatsConstData] = useState([]);

  useEffect(() => {
    if (services?.statisticsData) {
      setStatsConstData([
        {
          color: "#582538",
          label: "Total Projects",
          icon: <DocumentBulletList24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.totalProjects,
        },
        {
          color: "#007F0A",
          label: "Completed Projects",
          icon: <DocumentCheckmark24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.completedProjects,
        },
        {
          color: "#CA9700",
          label: "In Progress",
          icon: <Document24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.inProgress,
        },
        {
          color: "#0078D4",
          label: "Total Users ",
          icon: <People24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.totalUsers,
        },
      ]);
    }
  }, [services?.statisticsData]);

  return (
    <div
      className={classes.root}
      style={{
        overflowY: "scroll",
      }}
    >
      <Header classes={classes} text="Dashboard" />
      <Box className={classes.statastics}>
        {statsConstData?.length > 0 &&
          statsConstData.map((data, i) => (
            <StatisticsCard
              key={i}
              classes={classes}
              background={data.color}
              Icon={data.icon}
              label={data.label}
              totalNumber={data.count || "0"}
            />
          ))}
      </Box>
      <div className={classes.spaceBetween}>
        <FluentProvider theme={teamsLightTheme}>
          {/* main dashboard  */}

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

              {/* area graph */}
              <AreaGraph
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
