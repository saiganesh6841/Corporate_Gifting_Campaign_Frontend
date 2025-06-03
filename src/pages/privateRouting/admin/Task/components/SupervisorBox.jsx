import { Stack } from "@fluentui/react";
import { Persona } from "@fluentui/react-components";
import { Box } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";

const SupervisorDetails = () => {
  return (
    <>
      <Box className="box_container" sx={{ padding: "1rem" }}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Persona
            name="Kevin Sturgis"
            secondaryText="Available"
            avatar={{
              image: {
                src: "https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png",
              },
            }}
          />
        </Stack>
        <hr style={{ margin: "4px 0", borderColor: "#0000001A" }} />
        <Typography variant="subHeading">
          Upload today’s progress images for the Living Room in the Luxury Villa
          project. Ensure clarity and add comments if needed.
        </Typography>
        <br />
        <br />
        <Typography>9:00 AM</Typography>
      </Box>
    </>
  );
};

export default SupervisorDetails;
