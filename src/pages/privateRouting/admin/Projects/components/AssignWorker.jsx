import { Stack } from "@fluentui/react";
import { Checkbox, Field, Input, Text } from "@fluentui/react-components";
import { Box, Chip } from "@mui/material";
import { useState } from "react";
import Typography from "../../../../../components/Text/Typogarphy";
import {
  ChevronDown24Regular,
  ChevronUp24Regular,
  PresenceOffline16Regular,
} from "@fluentui/react-icons";

const AssignWorker = ({ classes, services, userForm, setUserForm, errors }) => {
  const [searchText, setSearchText] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleSelect = (sup) => {
    const isAlreadySelected = userForm?.assignedWorkers?.includes(sup._id);
    if (isAlreadySelected) {
      setUserForm((prev) => ({
        ...prev,
        assignedWorkers: prev.assignedWorkers.filter((id) => id !== sup._id),
      }));
    } else {
      setUserForm((prev) => ({
        ...prev,
        assignedWorkers: [...(prev.assignedWorkers || []), sup._id],
      }));
    }
    delete errors["assignedSupervisor"];
  };

  const handleRemove = (idToRemove) => {
    setUserForm((prev) => ({
      ...prev,
      assignedWorkers: prev.assignedWorkers.filter((id) => id !== idToRemove),
    }));
  };

  const selectedWorkers = services?.workerList?.filter((sup) =>
    userForm?.assignedWorkers?.includes(sup._id)
  );

  return (
    <Box className="box_container">
      <Stack tokens={{ childrenGap: 8, padding: "1rem" }}>
        <Typography variant="heading">Assign Workers</Typography>

        <Stack
          styles={{
            root: {
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: 8,
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Field label="Workers" className={classes.label} />
            {showDetails ? (
              <ChevronDown24Regular
                style={{ cursor: "pointer" }}
                onClick={() => setShowDetails(false)}
              />
            ) : (
              <ChevronUp24Regular
                style={{ cursor: "pointer" }}
                onClick={() => setShowDetails(true)}
              />
            )}
          </Box>

          {showDetails && (
            <>
              <Input
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value || "";
                  setSearchText(value);
                  services?.fetchWorkerList(value);
                }}
              />

              <Stack tokens={{ childrenGap: 4 }}>
                {services?.workerList?.length > 0 ? (
                  services?.workerList.map((sup) => {
                    const isSelected = userForm?.assignedWorkers?.includes(
                      sup._id
                    );
                    return (
                      <Stack
                        key={sup._id}
                        horizontal
                        verticalAlign="center"
                        onClick={() => handleToggleSelect(sup)}
                        styles={{
                          root: {
                            padding: "6px 8px",
                            cursor: "pointer",
                            justifyContent: "space-between",
                            backgroundColor: isSelected
                              ? "#e6f4ea"
                              : "transparent",
                            borderRadius: 4,
                          },
                        }}
                      >
                        <Typography variant="heading">
                          {sup.fullName}
                        </Typography>
                        {/* {isSelected && (
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "limegreen",
                            }}
                          />
                        )} */}
                        <Checkbox
                          checked={isSelected}
                          className="fui-checkbox"
                        />
                      </Stack>
                    );
                  })
                ) : (
                  <Text style={{ textAlign: "center" }}>No Data Found</Text>
                )}
              </Stack>
            </>
          )}
        </Stack>
        {errors?.assignedWorkers && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors?.assignedWorkers}
          </span>
        )}
        {selectedWorkers?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            {selectedWorkers.map((sup) => (
              <Chip
                key={sup._id}
                label={sup.fullName}
                onDelete={() => handleRemove(sup._id)}
                sx={{ backgroundColor: "#511C1C", color: "#fff" }}
                deleteIcon={
                  <PresenceOffline16Regular style={{ color: "#fff" }} />
                }
              />
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default AssignWorker;
