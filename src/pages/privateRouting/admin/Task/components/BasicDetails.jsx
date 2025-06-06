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
    delete errors?.task?.[index];
  };

  const handleAddTask = () => {
    // setUserForm((prev) => ({
    //   ...prev,
    //   task: [...(prev.task || []), { taskNo: null, taskDescription: "" }],
    // }));
    const lastTask = userForm.task?.[userForm.task.length - 1];
    if (!lastTask || lastTask.taskDescription.trim() !== "") {
      setUserForm((prev) => ({
        ...prev,
        task: [...(prev.task || []), { taskNo: null, taskDescription: "" }],
      }));
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = userForm.task.filter((_, i) => i !== index);
    setUserForm((prev) => ({
      ...prev,
      task: updatedTasks,
    }));
  };

  const isEdit = openForm?.divType === "edit";
  console.log(errors, userForm, "isEdit");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className="box_container">
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Project"
                required
                validationMessage={
                  errors?.projectId ? "Project field is required" : ""
                }
              >
                <Combobox
                  className={` input__Style`}
                  size="medium"
                  value={userForm?.projectName}
                  placeholder="Select the project"
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
                      }));
                    }
                    delete errors?.projectId;
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

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Floor"
                required
                validationMessage={errors?.floorNo}
              >
                <Combobox
                  className={` input__Style`}
                  size="medium"
                  onClick={() => services?.floorsDropdown(userForm?.projectId)}
                  value={userForm?.floor}
                  placeholder="Select the floor"
                  onOptionSelect={(e, data) => {
                    setUserForm((prev) => ({
                      ...prev,
                      floorNo: data.optionValue,
                      floor: data?.optionText,
                    }));
                    delete errors?.floorNo;
                  }}
                  disabled={!userForm?.projectId}
                >
                  {services?.floorList?.map((item) => (
                    <Option
                      key={item?._id}
                      value={item?._id}
                      text={item?.floor}
                    >
                      {item?.floor}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Flat"
                required
                validationMessage={errors?.flatNo}
              >
                <Combobox
                  className={` input__Style`}
                  size="medium"
                  placeholder="Select the flat"
                  onClick={() =>
                    services?.flatDropdown(
                      userForm?.projectId,
                      userForm?.floorNo
                    )
                  }
                  value={userForm?.flat}
                  onOptionSelect={(e, data) => {
                    setUserForm((prev) => ({
                      ...prev,
                      flatNo: data.optionValue,
                      flat: data?.optionText,
                    }));
                    delete errors?.flatNo;
                  }}
                  disabled={!userForm?.projectId || !userForm?.floorNo}
                >
                  {services?.flatList?.map((item) => (
                    <Option key={item?._id} value={item?._id} text={item?.flat}>
                      {item?.flat}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Room"
                required
                validationMessage={errors?.room}
              >
                <Combobox
                  className={` input__Style`}
                  size="medium"
                  placeholder="Select the room"
                  onClick={() =>
                    services?.roomDropdown(
                      userForm?.projectId,
                      userForm?.floorNo,
                      userForm?.flatNo
                    )
                  }
                  value={userForm?.roomName}
                  onOptionSelect={(e, data) => {
                    setUserForm((prev) => ({
                      ...prev,
                      room: data.optionValue,
                      roomName: data?.optionText,
                    }));
                    delete errors?.room;
                  }}
                  disabled={
                    !userForm?.projectId ||
                    !userForm?.floorNo ||
                    !userForm?.flatNo
                  }
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

            <Grid item xs={6}>
              <Field
                className={classes.label}
                label="Select Worker"
                required
                validationMessage={errors?.workerId}
              >
                <Combobox
                  className={` input__Style`}
                  size="medium"
                  placeholder="Select the worker"
                  onClick={() => services?.workerDropdown(userForm?.projectId)}
                  value={userForm?.worker}
                  onOptionSelect={(e, data) => {
                    setUserForm((prev) => ({
                      ...prev,
                      workerId: data.optionValue,
                      worker: data?.optionText,
                    }));
                    delete errors?.workerId;
                  }}
                  disabled={!userForm?.projectId}
                >
                  {services?.workerList?.map((item) => (
                    <Option
                      key={item?.workerId}
                      value={item?.workerId}
                      text={item?.workerName}
                    >
                      {item?.workerName}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className="box_container">
          <Grid container spacing={2} style={{ padding: "10px" }}>
            {isEdit ? (
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  horizontal
                  spacing={2}
                  gap={8}
                  sx={{ width: "100%" }}
                >
                  {/* Circular Number */}
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#fdecea",
                      color: "#5a1a16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {1}
                  </Box>
                  <Input
                    fullWidth
                    placeholder="ABC"
                    value={userForm?.taskDescription || ""}
                    onChange={(e) => {
                      setUserForm((prev) => ({
                        ...prev,
                        taskDescription: e.target.value,
                      }));
                    }}
                    style={{ flexGrow: 1 }}
                  />
                </Stack>
              </Grid>
            ) : (
              userForm?.task?.map((task, index) => (
                <Grid item xs={12} key={index}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    horizontal
                    spacing={2}
                    gap={8}
                    sx={{ width: "100%" }}
                  >
                    {/* Circular Number */}
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#fdecea",
                        color: "#5a1a16",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 500,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>

                    {/* Input Field */}
                    <Input
                      fullWidth
                      placeholder="Enter the description"
                      value={task.taskDescription}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      style={{ flexGrow: 1 }}
                    />

                    {/* Delete Icon */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveTask(index)}
                    >
                      <Delete16Filled
                        sx={{ color: "#5a1a16", cursor: "pointer" }}
                      />
                    </Box>
                  </Stack>
                  {errors?.task?.[index] && (
                    <div
                      style={{
                        color: "#bc2f32",
                        marginTop: 4,
                        fontSize: "12px",
                      }}
                    >
                      {errors.task[index]}
                    </div>
                  )}
                </Grid>
              ))
            )}
          </Grid>

          {!isEdit && (
            <Box
              sx={{ display: "flex", justifyContent: "end", padding: "10px" }}
              onClick={handleAddTask}
            >
              <PrimaryBtn style={{ width: "100px" }}>Add</PrimaryBtn>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default BasicDetails;
