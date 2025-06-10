import { Stack } from "@fluentui/react";
import { Persona } from "@fluentui/react-components";
import { Box } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";
import { use } from "react";
import utilController from "../../../../../utils/Utilcontroller";

const SupervisorDetails = ({ userForm }) => {
  return (
    <>
      <Box className="box_container" sx={{ padding: "1rem" }}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Persona
            name={use?.createdByName}
            secondaryText={userForm?.createdUserType}
            avatar={{
              image: {
                src: userForm?.createdImage,
              },
            }}
          />
        </Stack>
        <hr style={{ margin: "4px 0", borderColor: "#0000001A" }} />
        <Typography variant="subHeading">
          {userForm?.taskDescription}
        </Typography>
        <br />
        <br />
        <Typography>
          {utilController?.getFormattedTime(userForm?.createdAt)}
        </Typography>
      </Box>
    </>
  );
};

export default SupervisorDetails;
