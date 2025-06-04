import { Combobox, Dropdown, Option } from "@fluentui/react-components";
import { Grid, useTheme } from "@mui/material";
import React from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { onFormatDate } from "../utils/util";
import Typography from "../../../../../components/Text/Typogarphy";
const moduleOptionsList = {
  projects: "Projects",
  users: "Users",
  tasks: "Tasks",
};
const timeData = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

function GraphHeader({ setGraphFiltersData, graphFiltersData }) {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Dropdown
          size="large"
          placeholder="Select Module"
          style={{
            background: "#FFF",
            border: "none",
            paddingLeft: "0px",
            minWidth: "unset",
            width: "200px",
          }}
          className="dashboardDropdown"
          value={moduleOptionsList[graphFiltersData?.module]}
          onOptionSelect={(e, data) => {
            setGraphFiltersData((p) => ({
              ...p,
              module: data?.optionValue,
            }));
          }}
        >
          {Object.keys(moduleOptionsList)?.map((data) => (
            <Option className="dashboardOption" value={data}>
              {moduleOptionsList[data]}
            </Option>
          ))}
        </Dropdown>
      </Grid>

      <Grid item xs={4} sx={{marginLeft:"140px"}}>
        <DatePicker
          maxDate={new Date(graphFiltersData?.endDate * 1000)}
          formatDate={onFormatDate}
          style={{
            width: "150px",
            marginRight: "8px",
          }}
          className={` input__Style`}
          size="large"
          value={
            graphFiltersData?.startDate
              ? new Date(graphFiltersData?.startDate * 1000)
              : null
          }
          onSelectDate={(e) => {
            setGraphFiltersData((p) => ({
              ...p,
              startDate: new Date(e).setHours(0, 0, 0, 0) / 1000,
            }));
          }}
          placeholder="Start Date"
        />
        <DatePicker
          minDate={new Date(graphFiltersData?.startDate * 1000)}
          maxDate={new Date()}
          style={{
            width: "150px",
          }}
          formatDate={onFormatDate}
          className={` input__Style`}
          size="large"
          value={
            graphFiltersData?.endDate
              ? new Date(graphFiltersData?.endDate * 1000)
              : null
          }
          onSelectDate={(e) => {
            setGraphFiltersData((p) => ({
              ...p,
              endDate: new Date(e).setHours(23, 59, 0, 0) / 1000,
            }));
          }}
          placeholder="End Date"
        />
        {/* </Grid> */}
        {/* <Grid item xs={2}> */}
        <Dropdown
          size="large"
          placeholder="Time"
          className="time-select"
          style={{ minWidth: "unset", width: "150px", marginLeft:"5px" }}
          value={timeData[graphFiltersData?.dateType]}
          onOptionSelect={(e, data) => {
            setGraphFiltersData((p) => ({
              ...p,
              dateType: data?.optionValue,
            }));
          }}
        >
          {Object.keys(timeData)?.map((data) => (
            <Option key={data} value={data}>
              {timeData[data]}
            </Option>
          ))}
        </Dropdown>
      </Grid>
    </Grid>
  );
}

export default GraphHeader;
