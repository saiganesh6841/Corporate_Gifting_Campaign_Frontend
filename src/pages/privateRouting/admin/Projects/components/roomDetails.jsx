import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import PrimaryBtn from "../../../../../components/button";
import { useEffect, useState } from "react";
import { Stack } from "@fluentui/react";
import { Field, Input } from "@fluentui/react-components";
import {
  AddCircle24Regular,
  Delete20Filled,
  PresenceOffline16Regular,
  PresenceOffline20Regular,
  PresenceOfflineRegular,
} from "@fluentui/react-icons";
import RoomLogo from "../../../../../components/RoomLogo/Index";
import ConfirmationModal from "../../../../../components/ConfirmationModal/Index";

const RoomDetails = ({
  userForm,
  setUserForm,
  classes,
  services,
  openForm,
  editDeleteFloor,
  editDeleteFlat,
}) => {
  const [floorNoInput, setFloorNoInput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [flatNoInput, setFlatNoInput] = useState("");
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  const [isDeleteFloor, setIsDeleteFloor] = useState(false);
  const [isDeleteFlat, setIsDeleteFlat] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const handleAddFloor = () => {
    const floorNo = Number(floorNoInput);
    if (!floorNo || isNaN(floorNo)) return;
    if (userForm.details?.some((floor) => floor.floorNo === floorNo)) return;

    const newFloor = { floorNo, roomDetails: [] };
    setUserForm((prev) => ({
      ...prev,
      details: [...(prev.details || []), newFloor],
    }));

    setFloorNoInput("");
    setSelectedTab(0);
  };

  const handleDeleteFloor = (floorNo) => {
    setUserForm((prev) => ({
      ...prev,
      details: prev.details.filter((floor) => floor.floorNo !== floorNo),
    }));

    if (Number(floorNoInput) === floorNo) {
      setFloorNoInput("");
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setFloorNoInput(value);
    }
  };

  const handleAddFlat = () => {
    const flatNo = Number(flatNoInput);
    if (!flatNo || isNaN(flatNo)) return;

    setUserForm((prev) => {
      const updatedDetails = [...prev.details];
      const floor = updatedDetails[selectedFloorIndex];
      if (!floor.roomDetails.some((flat) => flat.flatNo === flatNo)) {
        floor.roomDetails.push({ flatNo, rooms: [] });
      }
      return { ...prev, details: updatedDetails };
    });

    setFlatNoInput("");
  };

  const handleDeleteFlat = (flatNo) => {
    setUserForm((prev) => {
      const updatedDetails = [...prev.details];
      updatedDetails[selectedFloorIndex].roomDetails = updatedDetails[
        selectedFloorIndex
      ].roomDetails.filter((flat) => flat.flatNo !== flatNo);
      return { ...prev, details: updatedDetails };
    });
  };

  const [inputValue, setInputValue] = useState("");

  const handleRoomDelete = (roomId) => {
    setUserForm((prev) => {
      const updatedDetails = [...prev.details];
      const flatRooms =
        updatedDetails[selectedFloorIndex].roomDetails[selectedTab].rooms;
      updatedDetails[selectedFloorIndex].roomDetails[selectedTab].rooms =
        flatRooms.filter((id) => id !== roomId);
      return { ...prev, details: updatedDetails };
    });
  };

  const handleSelect = (room) => {
    // Get currently selected floor and flat
    const floor = userForm.details[selectedFloorIndex];
    const flat = floor.roomDetails[selectedTab];
    console.log(flat, selectedTab, "flooor");
    if (flat?.rooms?.includes(room._id)) return;

    // // Update the userForm state
    setUserForm((prev) => {
      const updatedDetails = [...prev.details];
      updatedDetails[selectedFloorIndex]?.roomDetails[selectedTab]?.rooms.push(
        room._id
      );
      return { ...prev, details: updatedDetails };
    });

    // Hide suggestions and reset input
    setInputValue("");
  };

  const handleDeleteFloorAndFlat = (Id) => {
    if (isDeleteFloor) {
      editDeleteFloor(userForm?.recordId, Id);
      setSelectedFloorIndex(0);
    } else {
      editDeleteFlat(userForm?.recordId, Id);
      setSelectedTab(0);
    }
    dismissDelete();
  };

  const dismissDelete = () => {
    setIsDeleteFloor(false);
    setIsDeleteFlat(false);
  };
  console.log(userForm, "userForm");
  const isEdit = openForm?.divType === "edit";
  return (
    <>
      <Box className="box_container">
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="nowrap"
              gap={4}
              alignItems="center"
            >
              <Box
                display="flex"
                gap="16px"
                overflow="auto"
                maxWidth="calc(100% - 300px)"
                flexGrow={1}
                flexWrap="nowrap"
                sx={{
                  "& > *": {
                    flexShrink: 0,
                  },
                  scrollbarWidth: "none",
                }}
              >
                {userForm?.details?.map((val, ind) => (
                  <PrimaryBtn
                    key={ind}
                    style={{
                      maxWidth: "120px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    title={`Delete Floor ${val.floorNo}`}
                    variant={
                      selectedFloorIndex === ind ? "primary" : "outlined"
                    }
                    onClick={() => {
                      setSelectedFloorIndex(ind);
                      setSelectedTab(0);
                    }}
                  >
                    {`Floor ${val.floorNo}`}{" "}
                    <Delete20Filled
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isEdit) {
                          setSelectedDeleteId(val?.floor_id);
                          setIsDeleteFloor(true);
                        } else {
                          handleDeleteFloor(val.floorNo);
                          setSelectedFloorIndex(0);
                          setSelectedTab(0);
                        }
                      }}
                    />
                  </PrimaryBtn>
                ))}
              </Box>

              <Stack horizontal gap={4} style={{ flexShrink: 0 }}>
                <Input
                  type="text" // text so no native number arrows
                  placeholder="Enter Floor number"
                  value={floorNoInput}
                  onChange={handleInputChange}
                  style={{ width: "150px" }}
                />
                <PrimaryBtn
                  onClick={handleAddFloor}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  disabled={
                    !floorNoInput ||
                    userForm?.details?.some(
                      (floor) => floor.floorNo === Number(floorNoInput)
                    )
                  }
                >
                  <AddCircle24Regular />
                  Add Floor
                </PrimaryBtn>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {userForm.details?.[selectedFloorIndex] && (
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="nowrap"
                gap={4}
                alignItems="center"
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={selectedTab}
                  onChange={handleChange}
                  aria-label="Floor tabs"
                >
                  {userForm.details?.[selectedFloorIndex]?.roomDetails?.map(
                    (flat, ind) => (
                      <Tab
                        key={ind}
                        value={ind}
                        label={
                          <div className={classes.flatTab}>
                            {`Flat ${flat?.flatNo}`}
                            <Delete20Filled
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isEdit) {
                                  setSelectedDeleteId(flat?.flat_id);
                                  setIsDeleteFlat(true);
                                } else {
                                  handleDeleteFlat(flat.flatNo);
                                  setSelectedTab(0);
                                }
                              }}
                              style={{ cursor: "pointer" }}
                              title={`Delete Floor ${flat?.flatNo}`}
                            />
                          </div>
                        }
                      />
                    )
                  )}
                </Tabs>

                <Stack horizontal gap={4} style={{ flexShrink: 0 }}>
                  <Input
                    type="text" // text so no native number arrows
                    placeholder="Enter Flat number"
                    value={flatNoInput}
                    onChange={(e) =>
                      /^\d*$/.test(e.target.value) &&
                      setFlatNoInput(e.target.value)
                    }
                    style={{ width: "150px" }}
                  />
                  <PrimaryBtn
                    onClick={handleAddFlat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    disabled={
                      !flatNoInput ||
                      userForm.details?.[selectedFloorIndex]?.roomDetails?.some(
                        (flat) => flat.flatNo === Number(flatNoInput)
                      )
                    }
                  >
                    <AddCircle24Regular />
                    Add Flat
                  </PrimaryBtn>
                </Stack>
              </Box>
            )}
          </Grid>
          <hr style={{ width: "100%", opacity: 0.3 }} />
          {userForm.details?.[selectedFloorIndex]?.roomDetails?.[
            selectedTab
          ] && (
            <Grid item xs={12}>
              <div className={classes.showRoomLogo}>
                {userForm.details?.[selectedFloorIndex]?.roomDetails?.[
                  selectedTab
                ]?.rooms.map((room) => {
                  const roomData =
                    typeof room === "string"
                      ? services.roomList.find((r) => r._id === room)
                      : room.roomDetails;

                  if (!roomData) return null;

                  return (
                    <RoomLogo
                      key={roomData._id}
                      color={roomData.color}
                      roomLogo={roomData.roomLogo}
                      roomName={roomData?.roomName}
                    />
                  );
                })}
              </div>
              <Field className={classes.label} label="Add Room" />{" "}
              <Box className={classes.roomBox}>
                {userForm.details?.[selectedFloorIndex]?.roomDetails?.[
                  selectedTab
                ]?.rooms.map((room) => {
                  const roomData =
                    typeof room === "string"
                      ? services.roomList.find((r) => r._id === room)
                      : room.roomDetails;

                  if (!roomData) return null;

                  return (
                    <Chip
                      key={roomData._id}
                      label={roomData.roomName}
                      onDelete={() => handleRoomDelete(roomData._id)}
                      sx={{ backgroundColor: "#511C1C", color: "#fff" }}
                      deleteIcon={
                        <PresenceOffline16Regular style={{ color: "#fff" }} />
                      }
                    />
                  );
                })}

                <TextField
                  variant="standard"
                  value={inputValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputValue(val);
                    services?.fetchRoomList(val);
                  }}
                  placeholder="Type to add..."
                  InputProps={{ disableUnderline: true }}
                  sx={{ minWidth: 100, flexGrow: 1 }}
                />
              </Box>
              {inputValue && (
                <Paper sx={{ mt: 1, borderRadius: "8px", overflow: "hidden" }}>
                  <List disablePadding>
                    {services?.roomList?.length > 0 ? (
                      services?.roomList.map((room) => (
                        <ListItem
                          key={room._id}
                          button
                          onClick={() => handleSelect(room)}
                        >
                          <ListItemText primary={room.roomName} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No Data Found" />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
      <ConfirmationModal
        isOpen={isDeleteFloor || isDeleteFlat}
        onDismissModal={dismissDelete}
        title={isDeleteFloor ? "Delete Floor" : "Delete Flat"}
        content={`Are you sure you want to delete the ${
          isDeleteFloor ? "floor" : "flat"
        } `}
        Button={"Delete"}
        onClick={() => handleDeleteFloorAndFlat(selectedDeleteId)}
      />
    </>
  );
};

export default RoomDetails;
