import { IconButton, Stack } from "@fluentui/react";
import {
  Field,
  Input,
  Option,
  Combobox,
  Dropdown,
} from "@fluentui/react-components";

import { Box, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import PrimaryBtn from "../../../../../components/button";
import { Delete16Filled } from "@fluentui/react-icons";
import Typography from "../../../../../components/Text/Typogarphy";
import DatePickerComponent from "../../../../../components/DatePicker/Index";

function BasicDetails({
  classes,
  setUserForm,
  userForm,
  openForm,
  roles,
  errors,
  services,
}) {
  const theme = useTheme();
  const handleTaskChange = (index, value) => {
    const updatedTasks = [...userForm.task];
    updatedTasks[index].taskDescription = value;
    setUserForm((prev) => ({
      ...prev,
      task: updatedTasks,
    }));
  };

  const handleAddTask = () => {
    setUserForm((prev) => ({
      ...prev,
      task: [...(prev.task || []), { taskNo: null, taskDescription: "" }],
    }));
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = userForm.task.filter((_, i) => i !== index);
    setUserForm((prev) => ({
      ...prev,
      task: updatedTasks,
    }));
  };

  const isEdit = openForm?.divType === "edit";
  console.log(userForm?.taskDescription, "isEdit");
  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "10px", alignItems: "center" }}
    >
      <Grid item xs={2}>
        <Typography variant="title">
          Uploads{" "}
          <span style={{ color: "gray" }}>
            ({services?.progressData?.filterRecords ?? 0})
          </span>
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={4} gap="30px">
          <Grid item xs={1.6}>
            <Field
              className={classes.label}
              label="Select Project"
              required
              validationMessage={errors?.userType}
            >
              <Combobox
                className={` input__Style  progress_combobox`}
                size="medium"
                style={{ width: "150px", minWidth: "unset" }}
                value={userForm?.projectName}
                onOptionSelect={(e, data) => {
                  const selectedItem = services?.projectList?.find(
                    (item) => item._id === data.optionValue
                  );
                  if (selectedItem) {
                    setUserForm((prev) => ({
                      ...prev,
                      projectId: selectedItem._id,
                      projectName: selectedItem.projectName,
                      floorNo: "",
                      floor: "",
                      flatNo: "",
                      flat: "",
                      room: "",
                      roomName: "",
                    }));
                  }
                }}
              >
                {services?.projectList?.map((item) => (
                  <Option
                    key={item?._id}
                    value={item?._id}
                    text={item?.projectName}
                  >
                    {item?.projectName}
                  </Option>
                ))}
              </Combobox>
            </Field>
          </Grid>

          <Grid item xs={1}>
            <Field
              className={classes.label}
              label="Select Floor"
              required
              validationMessage={errors?.userType}
            >
              <Combobox
                className={` input__Style progress_combobox`}
                size="medium"
                style={{ width: "100px", minWidth: "unset" }}
                onClick={() => services?.floorsDropdown(userForm?.projectId)}
                value={userForm?.floor}
                disabled={!userForm?.projectId}
                onOptionSelect={(e, data) => {
                  setUserForm((prev) => ({
                    ...prev,
                    floorNo: data.optionValue,
                    floor: data?.optionText,
                    flatNo: "",
                    flat: "",
                    room: "",
                    roomName: "",
                  }));
                }}
              >
                {services?.floorList?.map((item) => (
                  <Option key={item?._id} value={item?._id} text={item?.floor}>
                    {item?.floor}
                  </Option>
                ))}
              </Combobox>
            </Field>
          </Grid>

          <Grid item xs={1}>
            <Field
              className={classes.label}
              label="Select Flat"
              required
              validationMessage={errors?.userType}
            >
              <Combobox
                className={` input__Style progress_combobox`}
                size="medium"
                style={{ width: "100px", minWidth: "unset" }}
                disabled={!userForm?.floorNo}
                onClick={() =>
                  services?.flatDropdown(userForm?.projectId, userForm?.floorNo)
                }
                value={userForm?.flat}
                onOptionSelect={(e, data) => {
                  setUserForm((prev) => ({
                    ...prev,
                    flatNo: data.optionValue,
                    flat: data?.optionText,
                    room: "",
                    roomName: "",
                  }));
                }}
              >
                {services?.flatList?.map((item) => (
                  <Option key={item?._id} value={item?._id} text={item?.flat}>
                    {item?.flat}
                  </Option>
                ))}
              </Combobox>
            </Field>
          </Grid>

          <Grid item xs={2.4}>
            <Field
              className={classes.label}
              label="Select Room"
              required
              validationMessage={errors?.userType}
            >
              <Combobox
                className={` input__Style progress_combobox`}
                size="medium"
                onClick={() =>
                  services?.roomDropdown(
                    userForm?.projectId,
                    userForm?.floorNo,
                    userForm?.flatNo
                  )
                }
                disabled={!userForm?.flatNo}
                style={{ width: "200px", minWidth: "unset" }}
                value={userForm?.roomName}
                onOptionSelect={(e, data) => {
                  setUserForm((prev) => ({
                    ...prev,
                    room: data.optionValue,
                    roomName: data?.optionText,
                  }));
                }}
              >
                {services?.roomList?.map((item) => (
                  <Option
                    key={item?._id}
                    value={item?._id}
                    text={item?.roomName}
                  >
                    {item?.roomName}
                  </Option>
                ))}
              </Combobox>
            </Field>
          </Grid>
          <Grid item xs={2}>
            <Field
              className={classes.label}
              label="Start Date"
              validationMessage={errors?.startDate}
              htmlFor="startDate"
              required
            >
              <DatePickerComponent
                className={` input__Style`}
                size="large"
                value={
                  userForm?.startDate
                    ? new Date(userForm.startDate * 1000)
                    : null
                }
                style={{ width: "160px", minWidth: "unset" }}
                handleChange={(e) => {
                  setUserForm({ ...userForm, startDate: new Date(e) / 1000 });
                  delete errors["startDate"];
                }}
                // maxDate={new Date(userForm?.endDate * 1000)}
                disabled={openForm?.divType === "view"}
              />
            </Field>
          </Grid>
          <Grid item xs={2}>
            <Field
              className={classes.label}
              label="End Date"
              validationMessage={errors?.endDate}
              htmlFor="endDate"
              required
            >
              <DatePickerComponent
                className={` input__Style`}
                minDate={new Date(userForm?.startDate * 1000)}
                size="large"
                style={{ width: "160px", minWidth: "unset" }}
                value={
                  userForm?.endDate ? new Date(userForm.endDate * 1000) : null
                }
                handleChange={(e) => {
                  setUserForm({ ...userForm, endDate: new Date(e) / 1000 });
                  delete errors["endDate"];
                }}
                disabled={openForm?.divType === "view"}
              />
            </Field>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
