import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Typography from "../../../../../components/Text/Typogarphy";

const CustomTooltip = (props) => {
  const { graphFiltersData } = props;

  const isDay = graphFiltersData?.dateType === "day";
  const module = graphFiltersData?.module;
  const hoveredData = props?.payload?.[0]?.payload || {};

  let label = "";
  let value = 0;

  if (module === "projects") {
    label = isDay ? "Total Projects" : "No. of Projects";
    value = hoveredData.totalProjects;
  } else if (module === "users") {
    label = isDay ? "Total Users" : "No. of Users";
    value = hoveredData.totalUsers;
  } else if (module === "tasks") {
    label = isDay ? "Total Tasks" : "No. of Tasks";
    value = hoveredData.totalTask;
  }

  const style = {
    color: "black",
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
  };

  const renderModuleDetails = (style) => {
    switch (module) {
      case "projects":
        return (
          <>
            <Typography variant="subHeading" style={style}>
              Completed : {hoveredData.completedProject}
            </Typography>
            <Typography variant="subHeading" style={style}>
              pending : {hoveredData.pending}
            </Typography>
            <Typography variant="subHeading" style={style}>
              In Progress : {hoveredData.inProgress}
            </Typography>
            <Typography variant="subHeading" style={style}>
              Cancelled : {hoveredData.cancelled}
            </Typography>
          </>
        );

      case "users":
        return (
          <>
            <Typography variant="subHeading" style={style}>
              Workers : {hoveredData.worker}
            </Typography>
            <Typography variant="subHeading" style={style}>
              Admins : {hoveredData.admin}
            </Typography>
            <Typography variant="subHeading" style={style}>
              Supervisors : {hoveredData.supervisor}
            </Typography>
          </>
        );

      case "tasks":
        return (
          <>
            <Typography variant="subHeading" style={style}>
              Completed : {hoveredData.completedTask}
            </Typography>
            <Typography variant="subHeading" style={style}>
              Pending : {hoveredData.pendingTask}
            </Typography>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        height: "100%",
        boxShadow: "0px 8px 22px 0px rgba(0, 0, 0, 0.07)",
        background: "#410E0E1A",
        borderRadius: "10px",
        padding: "5px 14px",
      }}
    >
      {graphFiltersData?.dateType === "day" && (
        <div>
          <Typography
            variant={"subHeading"}
            style={{
              color: "black",
              fontWeight: 600,
              borderBottom: "1px solid #56565694",
            }}
          >
            Date : {props?.payload[0]?.payload?.day} -{" "}
            {props?.payload[0]?.payload?.month} -{" "}
            {props?.payload[0]?.payload?.year}
          </Typography>
        </div>
      )}
      <div>
        <Typography
          variant={"subHeading"}
          style={{
            color: "black",
            fontWeight: 600,
          }}
        >
          {`${label}: ${value}`}
        </Typography>
      </div>
      {renderModuleDetails(style)}
    </div>
  );
};

const AreaGraph = ({ services, graphFiltersData }) => {
  const xAxisKey =
    graphFiltersData.dateType === "month"
      ? "monthName"
      : graphFiltersData.dateType === "week"
      ? "week"
      : graphFiltersData.dateType === "day"
      ? "day"
      : "year";

  return (
    <div style={{ width: "100%", height: 370 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={services?.graphData}>
          <defs>
            <linearGradient
              id="gradientColor"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#561E1E" />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} horizontal={true} />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip
            content={<CustomTooltip graphFiltersData={graphFiltersData} />}
          />
          <Area
            type="monotone"
            dataKey={
              graphFiltersData?.module === "projects"
                ? "totalProjects"
                : graphFiltersData?.module === "users"
                ? "totalUsers"
                : "totalTask"
            }
            stroke="#561E1E"
            fill="url(#gradientColor)"
            strokeWidth={"3px"}
            fillOpacity={0.04}
            dot={{ r: 5, fill: "#FFFF", stroke: "#561E1E", strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
