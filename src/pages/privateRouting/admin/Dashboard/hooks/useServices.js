import { useEffect, useState } from "react";
import { store } from "../../../../..";
import ConfigAPIURL from "../../../../../config/ConfigAPIURL";
import LocalStorage from "../../../../../config/LocalStorage";
import useAlert from "../../../../../hooks/useAlert";
import APIRequest from "../../../../../utils/APIRequest";
import APIRequestDataTableQuery from "../../../../../utils/APIRequestDataTableQuery";
import apiFetchRequest from "../../../../../utils/ApiFetchRequest";
import fieldsValidation from "../../../../../utils/FieldsValidation";
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

  useEffect(() => {
    handleGetCountDashboard();
  }, []);
  useEffect(() => {
    getPieChartData();
  }, [JSON.stringify(pieChartFiltersData)]);
  useEffect(() => {
    getGraphData();
  }, [JSON.stringify(graphFiltersData)]);

  const handleGetCountDashboard = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getDashBoardCounts,
      ""
    );
    if (response?.data?.responseCode === 109) {
      setStatisticsData(response?.data?.data);
    }
  };

  const structureGraphData = (timeType, apiData) => {
    if (timeType === "month" || timeType === "week") {
      const data = apiData?.map((curr) => {
        const value =
          timeType === "month"
            ? getMonthName(curr?.month)
            : `Week ${curr?.week} , ${getMonthName(curr?.month)}`;
        return {
          ...curr,
          [timeType]: value,
        };
      });
      setGraphData(data);
    } else {
      setGraphData(apiData);
    }
  };

  const structurePieChartData = (pieChartResult) => {
    const data = pieChartResult.map((curr, i) => ({
      ...curr,
      name: curr?.planName,
      value: curr?.totalRevenue,
      fill: constantColors[i],
    })); //move to a seperate function

    setPieChartData(data);
  };

  const getGraphData = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getGraphData,
      JSON.stringify({ ...graphFiltersData })
    );
    if (response?.data?.responseCode === 109) {
      structureGraphData(graphFiltersData?.dateType, response?.data?.result);
    }
  };

  const getPieChartData = async () => {
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.getPieChartData,
      JSON.stringify({ ...pieChartFiltersData })
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
  };
};

export default useServices;
