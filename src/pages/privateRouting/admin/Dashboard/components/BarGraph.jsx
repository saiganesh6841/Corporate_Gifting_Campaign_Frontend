// import { Tooltip } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

function BarGraph({ color, services, graphFiltersData }) {
  return (
    <BarChart
      width={600}
      height={300}
      data={services?.graphData} //  data
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis
        dataKey={graphFiltersData?.dateType}
        scale="point"
        padding={{ left: 10, right: 10 }}
      />
      <YAxis />
      <Tooltip
        content={<CustomTooltip moduleType={graphFiltersData?.module} />}
      />
      <Bar
        dataKey="totalCount"
        fill={color}
        // fontFamily="Segoe UI"
        background={{ fill: "#fff" }}
      />
    </BarChart>
  );
}

export default BarGraph;
