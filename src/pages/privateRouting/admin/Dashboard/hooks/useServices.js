import { useEffect, useState } from "react";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import APIRequest from "../../../../../utils/APIRequest";
import { getMonthName } from "../utils/util";

// this is api calls happen

const constantColors = [
  "#A0A8FF",
  "#4F5CE7",
  "#707BF7",
  "#4f5ce7",
  "#6673f3",
  "#8690f3",
  "#a8b0fa",
]; // colors for the pie charts
const useServices = ({ graphFiltersData, pieChartFiltersData }) => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    handleGetCountDashboard();
  }, []);
  // useEffect(() => {
  //   getPieChartData();
  // }, [JSON.stringify(pieChartFiltersData)]);
  // useEffect(() => {
  //   getProjects();
  // }, [JSON.stringify(graphFiltersData)]);

  const handleGetCountDashboard = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getDashBoardCounts,
      JSON.stringify({
        organizationId: JSON.parse(localStorage.getItem("userDetails"))
          ?.organizationId,
      }),
    );
    if (response?.data?.responseCode === 109) {
      setStatisticsData(response?.data?.data);
    }
  };

  // const structureGraphData = (timeType, apiData, graphType) => {
  //   if (timeType === "month" || timeType === "week") {
  //     const data = apiData?.[graphType]?.map((curr) => {
  //       const value =
  //         timeType === "month"
  //           ? getMonthName(curr?.month)
  //           : `Week ${curr?.week} , ${getMonthName(curr?.month)}`;
  //       return {
  //         ...curr,
  //         [timeType]: value,
  //       };
  //     });
  //     setGraphData(data);
  //   } else {
  //     setGraphData(apiData);
  //   }
  // };

  const structurePieChartData = (pieChartResult) => {
    const data = pieChartResult.map((curr, i) => ({
      ...curr,
      name: curr?.planName,
      value: curr?.totalRevenue,
      fill: constantColors[i],
    })); //move to a seperate function
    r;
    setPieChartData(data);
  };

  // const getGraphData = async () => {
  //   const url = `${ConfigAPIURL.getGraphData}?startDate=${graphFiltersData?.startDate}&endDate=${graphFiltersData?.endDate}&status=${graphFiltersData?.status}`;
  //   const response = await APIRequest.request("GET", url);
  //   if (response?.data?.responseCode === 109) {
  //     setGraphData(response?.data?.result?.[graphFiltersData?.module]);
  //   }
  // };

  const getProjects = async () => {
    try {
      const url = `${ConfigAPIURL.getDashboardProjects}?startDate=${graphFiltersData?.startDate}&endDate=${graphFiltersData?.endDate}&status=${graphFiltersData?.status}`;
      const response = await APIRequest.request("GET", url);
      if (response?.data?.responseCode === 109) {
        setProjects(response?.data?.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPieChartData = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getPieChartData,
      JSON.stringify({ ...pieChartFiltersData }),
    );
    if (response?.data?.responseCode === 109) {
      structurePieChartData(response?.data?.result);
    }
  };

  return {
    statisticsData,
    setStatisticsData,
    graphData,
    pieChartData,
    projects,
  };
};

export default useServices;
