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
import DashboardProject from "./components/DashboardProject";
import OrganizationCard from "./components/OrganizationCard";

const graphFilter = {
  status: "",
  startDate: "",
  endDate: "",
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
          label: "Total Campaigns",
          icon: <DocumentBulletList24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.totalCampaigns,
        },
        {
          color: "#007F0A",
          label: "Completed Campaigns",
          icon: <DocumentCheckmark24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.completedCampaigns,
        },
        {
          color: "#CA9700",
          label: "Active Campaigns",
          icon: <Document24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.activeCampaigns,
        },
        {
          color: "#0078D4",
          label: "Total Employees",
          icon: <People24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.totalEmployees,
        },
        {
          color: "#582538",
          label: "Total Orders",
          icon: <DocumentBulletList24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.totalOrders,
        },
        {
          color: "#007F0A",
          label: "Delivered Orders",
          icon: <DocumentCheckmark24Regular style={{ color: "#ffff" }} />,
          count: services?.statisticsData?.summary?.totalDelivered,
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
        {
          type: "organization",
          organizationName: services?.statisticsData?.organization?.name,
          email: services?.statisticsData?.organization?.email,
          mobile: services?.statisticsData?.organization?.mobileNumber,
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
          statsConstData?.map((data, i) =>
            data.type === "organization" ? (
              <OrganizationCard key={i} classes={classes} data={data} />
            ) : (
              <StatisticsCard
                key={i}
                classes={classes}
                background={data.color}
                Icon={data.icon}
                label={data.label}
                totalNumber={data.count || "0"}
              />
            ),
          )}
      </Box>
      {/* <div className={classes.spaceBetween}>
        <FluentProvider theme={teamsLightTheme}>

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

              <AreaGraph
                services={services}
                graphFiltersData={graphFiltersData}
              />

              <DashboardProject services={services} />
            </Box>
          </Box>
        </FluentProvider>
      </div> */}
    </div>
  );
}

export default Dashboard;
