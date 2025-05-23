import { Stack } from "@fluentui/react";
import {
  Combobox,
  Dropdown,
  Field,
  FluentProvider,
  Option,
  teamsLightTheme,
  Text,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import React, { useEffect, useState } from "react";
import Typography from "../Text/Typogarphy";

const CustomFilter = ({ query, setQuery, openForm, resetForm, children }) => {
  const [filter, setFilter] = useState({});
  //using in the expense management filter page

  useEffect(() => {
    setFilter({
      active: query?.active,
      startDate: query?.startDate,
      endDate: query?.endDate,
      userType: query?.userType,
      createdByName: query?.createdByName,
      createdByKeyword: query?.createdByKeyword,
    });
  }, [query]);

  useEffect(() => {
    if (openForm?.isSaveForm) {
      setFilter({
        ...filter,
        startDate: filter?.startDate,
        endDate: filter?.endDate,
      });
      setQuery({ ...query, ...filter });

      resetForm();
    }
  }, [openForm]);

  const heading = "Custom filter";
  const paragraph = "Choose the conditions for your custom filter";

  return (
    <FluentProvider theme={teamsLightTheme}>
      <Stack style={{ paddingTop: "8px", gap: "16px" }}>
        <Stack style={{ gap: "8px" }}>
          <Typography variant="heading">{heading}</Typography>
          <Typography variant="subHeading">{paragraph}</Typography>
        </Stack>

        <Field label="Active">
          <Dropdown
            className={` input__Style`}
            key={`dropdown-${filter?.active}`}
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
              text="Yes"
              value="Yes"
            >
              Yes
            </Option>
            <Option
              style={{ textTransform: "capitalize" }}
              text="No"
              value="No"
            >
              No
            </Option>
          </Dropdown>
        </Field>

        <Field label="Start Date">
          <DatePicker
            maxDate={new Date(filter?.endDate * 1000)}
            className={` input__Style`}
            size="large"
            value={
              filter?.startDate ? new Date(filter?.startDate * 1000) : null
            }
            onSelectDate={(e) =>
              setFilter({
                ...filter,
                startDate: new Date(e).setHours(0, 0, 0, 0) / 1000,
              })
            }
            placeholder="Select Start Date..."
            disabled={
              filter?.expenseDate ||
              query?.expenseDate ||
              filter?.startDateTime ||
              query?.startDateTime
            }
          />
        </Field>
        <Field label="End Date">
          <DatePicker
            minDate={new Date(filter?.startDate * 1000)}
            maxDate={new Date()}
            className={` input__Style`}
            size="large"
            value={filter?.endDate ? new Date(filter?.endDate * 1000) : null}
            onSelectDate={(e) => {
              //send the current timestamp instead of morning
              setFilter({
                ...filter,
                endDate: new Date(e).setHours(23, 59, 0, 0) / 1000,
              });
            }}
            placeholder="Select End Date..."
            disabled={
              filter?.expenseDate ||
              query?.expenseDate ||
              filter?.startDateTime ||
              query?.startDateTime
            }
          />
        </Field>
        {children}
      </Stack>
    </FluentProvider>
  );
};

export default CustomFilter;
