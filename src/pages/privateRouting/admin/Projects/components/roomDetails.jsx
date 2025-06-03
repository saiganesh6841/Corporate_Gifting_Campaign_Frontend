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
import { useState } from "react";
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

const availableRooms = [
  "Living room",
  "Dining Area",
  "Guest Bedroom",
  "Kids bedroom",
  "Kitchen",
  "Master Bedroom",
  "Study Room",
  "Balcony",
];

const RoomDetails = ({ userForm, setUserForm, classes, services }) => {
  const [floorNoInput, setFloorNoInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [flatNoInput, setFlatNoInput] = useState("");
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
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
  console.log(userForm, "userForm");
  return (
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
                  variant={selectedFloorIndex === ind ? "primary" : "outlined"}
                  onClick={() => setSelectedFloorIndex(ind)}
                >
                  {`Floor ${val.floorNo}`}{" "}
                  <Delete20Filled
                    onClick={() => handleDeleteFloor(val.floorNo)}
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            maxWidth: "120px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {`Flat ${flat?.flatNo}`}
                          <Delete20Filled
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent tab switch
                              handleDeleteFlat(flat.flatNo);
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
                >
                  <AddCircle24Regular />
                  Add Flat
                </PrimaryBtn>
              </Stack>
            </Box>
          )}
        </Grid>
        <hr style={{ width: "100%", opacity: 0.3 }} />
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              padding: "8px 0",
              scrollbarWidth: "none",
            }}
          >
            {userForm.details?.[selectedFloorIndex]?.roomDetails?.[
              selectedTab
            ]?.rooms.map((roomId) => {
              const room = services.roomList.find((r) => r._id === roomId);
              if (!room) return null;
              return (
                <RoomLogo
                  key={roomId}
                  color={room.color}
                  roomLogo={room.roomLogo}
                />
              );
            })}
          </div>
          <Field className={classes.label} label="Add Room" />{" "}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            {userForm.details?.[selectedFloorIndex]?.roomDetails?.[
              selectedTab
            ]?.rooms.map((roomId) => {
              const room = services.roomList.find((r) => r._id === roomId);
              if (!room) return null;
              return (
                <Chip
                  key={room._id}
                  label={room.roomName}
                  onDelete={() => handleRoomDelete(room._id)}
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
      </Grid>
    </Box>
  );
};

export default RoomDetails;
