import { Box, Grid } from "@mui/material";
import MessageInputBar from "../../../../../components/ChatInput/Index";
import ImageSelectionGallery from "./ImageGallery";
import ChatMessages from "../../../../../components/ChatMessages/Index";
import { useEffect, useState } from "react";

const UploadModal = ({
  roomImages,
  classes,
  id,
  deleteRoomImage,
  services,
}) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (id) {
      services?.messagesList(id);
    }
  }, [id]);

  const handleSend = () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage) return;
    services?.addMessage(id, trimmedMessage);
    setInputValue(""); // Clear input after send
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
    <>
      <Grid container spacing={2} marginTop="20px">
        <Grid item xs={12}>
          <ImageSelectionGallery
            Images={roomImages}
            classes={classes}
            id={id}
            deleteRoomImage={deleteRoomImage}
          />
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
    </>
  );
};
export default UploadModal;
