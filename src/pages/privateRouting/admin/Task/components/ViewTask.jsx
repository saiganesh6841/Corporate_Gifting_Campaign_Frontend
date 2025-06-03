import { Label, PersonaSize, Stack, Text } from "@fluentui/react";
import {
  FluentProvider,
  Persona,
  teamsLightTheme,
} from "@fluentui/react-components";
import { Box, Grid } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";
import TaskDetails from "./TaskDetails";
import SupervisorDetails from "./SupervisorBox";
import ImageSelectionGallery from "./ImageGallery";
import MessageInputBar from "../../../../../components/ChatInput/Index";
import useAevForm from "../hooks/useAevForm";

const ViewTask = ({ openForm, setOpenForm, classes, services }) => {
  const { userForm, setUserForm } = useAevForm({
    openForm,
    services,
    setOpenForm,
  });
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Grid
        container
        className={`${classes.distinct} ${classes.gapMedium}`}
        style={{
          marginTop: "10px",
        }}
        spacing={2}
      >
        <Grid item xs={6}>
          <TaskDetails userForm={userForm} />
        </Grid>
        <Grid item xs={6}>
          <SupervisorDetails />
        </Grid>
        <Grid item xs={12}>
          <ImageSelectionGallery Images={userForm?.images} />
        </Grid>
        <Grid item xs={12}>
          <Box className="box_container" sx={{ padding: "1rem" }}>
            <MessageInputBar />
          </Box>
        </Grid>
      </Grid>
    </FluentProvider>
  );
};
export default ViewTask;
