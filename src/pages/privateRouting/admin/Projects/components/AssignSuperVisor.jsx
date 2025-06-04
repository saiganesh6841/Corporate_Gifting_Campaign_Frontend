import { SearchBox, Stack } from "@fluentui/react";
import { Field, Input, Text } from "@fluentui/react-components";
import { Box, Chip, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import Typography from "../../../../../components/Text/Typogarphy";
import {
  ChevronDown24Regular,
  ChevronDownRegular,
  ChevronUp24Regular,
  PresenceOffline16Regular,
} from "@fluentui/react-icons";

const AssignSuperVisor = ({
  classes,
  services,
  userForm,
  setUserForm,
  errors,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const handleSelect = (sup) => {
    setUserForm((prev) => ({
      ...prev,
      assignedSupervisor: sup?._id,
    }));
    delete errors["assignedSupervisor"];
  };
  const handleRemove = () => {
    setUserForm((prev) => ({
      ...prev,
      assignedSupervisor: null,
    }));
  };

  const selectedSupervisor = services?.superVisorList?.find(
    (sup) => sup._id === userForm?.assignedSupervisor
  );
  return (
    <>
      <Box className="box_container">
        <Stack tokens={{ childrenGap: 8, padding: "1rem" }}>
          <Typography variant="heading">Assign SuperVisor</Typography>

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
              <Field label="SuperVisors" className={classes.label} />
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
                    setSearchText(e.target.value || "");
                    services?.fetchSuperVisorList(e.target.value);
                  }}
                />
                <Stack tokens={{ childrenGap: 4 }}>
                  {services?.superVisorList?.length > 0 ? (
                    services?.superVisorList.map((sup) => (
                      <Stack
                        key={sup._id}
                        horizontal
                        verticalAlign="center"
                        onClick={() => handleSelect(sup)}
                        styles={{
                          root: {
                            padding: "6px 8px",
                            cursor: "pointer",
                            justifyContent: "space-between",
                          },
                        }}
                      >
                        <Typography variant="heading">
                          {sup.fullName}
                        </Typography>
                        {userForm?.assignedSupervisor === sup._id && (
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "limegreen",
                            }}
                          />
                        )}
                      </Stack>
                    ))
                  ) : (
                    <Text style={{ textAlign: "center" }}>No Data Found</Text>
                  )}
                </Stack>
              </>
            )}
          </Stack>
          {errors?.assignedSupervisor && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors?.assignedSupervisor}
            </span>
          )}
          {selectedSupervisor && (
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
              <Chip
                label={selectedSupervisor.fullName}
                onDelete={handleRemove}
                sx={{ backgroundColor: "#511C1C", color: "#fff" }}
                deleteIcon={
                  <PresenceOffline16Regular style={{ color: "#fff" }} />
                }
              />
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};
export default AssignSuperVisor;
