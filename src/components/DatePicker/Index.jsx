import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import React from "react";

const DatePickerComponent = ({
  value,
  handleChange,
  className,
  minDate,
  maxDate,
  style,
  disabled,
  removeIcon,
}) => {
  return (
    <FluentProvider theme={teamsLightTheme}>
      <DatePicker
        className={className}
        style={{
          width: "100%",
          cursor: disabled ? "not-allowed" : "pointer",
          ...style,
        }}
        size="large"
        value={value}
        // onSelectDate={(e, data) => handleChange(e)}
        onSelectDate={(date) => handleChange(date)}
        placeholder="Select a date..."
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
      />
    </FluentProvider>
  );
};

export default DatePickerComponent;
