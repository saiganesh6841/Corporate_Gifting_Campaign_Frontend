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
import { useEffect, useState } from "react";
import ChatMessages from "../../../../../components/ChatMessages/Index";

const ViewTask = ({ openForm, setOpenForm, classes, services }) => {
  const { userForm, setUserForm } = useAevForm({
    openForm,
    services,
    setOpenForm,
  });
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (userForm?.entryId) {
      services?.messagesList(userForm?.entryId);
    }
  }, [userForm?.entryId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSend = () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage) return;
    services?.addMessage(userForm?.entryId, trimmedMessage);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
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
            <ChatMessages messages={services?.listMessages} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="box_container" sx={{ padding: "1rem" }}>
            <MessageInputBar
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onSend={handleSend}
              onKeyPress={handleKeyPress}
            />
          </Box>
        </Grid>
      </Grid>
    </FluentProvider>
  );
};
export default ViewTask;
