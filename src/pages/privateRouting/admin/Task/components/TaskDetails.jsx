import { PersonaSize, Stack } from "@fluentui/react";
import { Label, Persona, Text } from "@fluentui/react-components";
import { Box } from "@mui/material";

const TaskDetails = ({ userForm }) => {
  return (
    <>
      <Box className="box_container" sx={{ padding: "1rem" }}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Persona
              text="Sahil Nora"
              size={PersonaSize.size40}
              imageUrl="https://via.placeholder.com/40"
            />
            <Text>{userForm?.worker}</Text>
          </Box>

          <span
            style={{
              backgroundColor: "#f3d4ff",
              padding: "4px 12px",
              borderRadius: 6,
              color: "#5f259f",
              fontWeight: 500,
              fontSize: 12,
            }}
          >
            {userForm?.taskId}
          </span>
        </Stack>

        <hr style={{ margin: "8px 0", borderColor: "#0000001A" }} />

        <Stack horizontal horizontalAlign="space-between">
          <Stack>
            <Label>Project</Label>
            <Text>{userForm?.projectName}</Text>
          </Stack>
          <Stack>
            <Label>Floor</Label>
            <Text>{userForm?.floor}</Text>
          </Stack>
          <Stack>
            <Label>Flat</Label>
            <Text>{userForm?.flat}</Text>
          </Stack>
          <Stack>
            <Label>Room</Label>
            <Text>{userForm.roomName}</Text>
          </Stack>
        </Stack>

        <hr style={{ margin: "8px 0", borderColor: "#ACAFB51A" }} />
        <Stack horizontal horizontalAlign="space-between">
          <Stack>
            <Label>Date</Label>
            <Text>Apr 15, 2023</Text>
          </Stack>
          <Stack>
            <Label>Send By</Label>
            <Text>Martin Deo</Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default TaskDetails;
