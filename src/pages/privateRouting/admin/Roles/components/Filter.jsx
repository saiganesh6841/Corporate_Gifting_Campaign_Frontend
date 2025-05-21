import { Stack } from "@fluentui/react";
import {
  Combobox,
  Dropdown,
  Field,
  FluentProvider,
  Option,
  Persona,
  teamsLightTheme,
} from "@fluentui/react-components";
import useAlert from "../../../../../hooks/useAlert";
import { Label } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Typography from "../../../../../components/Text/Typography";
import { DatePicker } from "@fluentui/react-datepicker-compat";

const status = ["pending", "rejected", "approved"];
const userType = ["admin", "vendor",  "travel_agent", "all"];

const Filter = ({ query, setQuery, openForm, resetForm, resetQueryBody }) => {
  const [datesetting, setDateSetting] = useState({
    startDate: query?.startDate || new Date(),
    endDate: query?.endDate || new Date(),
  });

  const { publishNotification } = useAlert();
  const [filter, setFilter] = useState({
    active: query?.active,
    userType: (query?.userType || "").toLowerCase(),
    startDate: query?.startDate,
    endDate: query?.endDate,
  });

  useEffect(() => {
    setFilter({ ...filter, startDate: null });
  }, [filter?.userType]);

  useEffect(() => {
    if (openForm?.isSaveForm) {
      setFilter({
        ...filter,
        startDate: filter?.startDate,
        endDate: filter?.endDate,
        userType: (filter?.userType || "").toLowerCase(),
      });
      setQuery({ ...query, ...filter });
      resetForm();
    }
  }, [openForm]);

  const heading = "Custom filter";
  const paragraph = "Choose the conditions for your custom filter";

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Stack style={{ padding: "8px", gap: "24px" }}>
        <Stack style={{ gap: "8px" }}>
        <Typography
            variant="mainTitle"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            {heading}
          </Typography>
          <Typography
            variant="subHeading"
            style={{ fontWeight: 400, fontSize: "14px" }}
          >
            {paragraph}
          </Typography>
        </Stack>
      

        <Field label="Active">
          <Combobox
            className={` input__Style`}
            value={filter?.active ? "Yes" : "No"}
            size="large"
            style={{ textTransform: "capitalize" }}
            onOptionSelect={(e, data) => {
              setFilter({
                ...filter,
                active: data?.optionValue === "Yes" ? true : false,
              });
            }}
          >
            <Option
              style={{ textTransform: "capitalize" }}
              text={true}
              value={"Yes"}
            >
              Yes
            </Option>
            <Option
              style={{ textTransform: "capitalize" }}
              text={false}
              value={"No"}
            >
              No
            </Option>
          </Combobox>
        </Field>
        <Field label="Start Date">
          <DatePicker
            maxDate={new Date(filter?.endDate * 1000)}
            className={` input__Style`}
            size="large"
            value={filter?.startDate && new Date(filter?.startDate * 1000)}
            onSelectDate={(e) =>
              setFilter({
                ...filter,
                startDate: new Date(e) / 1000,
              })
            }
            placeholder="Select Start Date..."
          />
        </Field>
        <Field label="End Date">
          <DatePicker
            minDate={new Date(filter?.startDate * 1000)}
            maxDate={new Date()}
            className={` input__Style`}
            size="large"
            value={new Date(filter?.endDate * 1000)}
            onSelectDate={(e) =>
              setFilter({
                ...filter,
                endDate: new Date(e) / 1000,
              })
            }
            placeholder="Select End Date..."
          />
        </Field>
      </Stack>
    </FluentProvider>
  );
};

export default Filter;
