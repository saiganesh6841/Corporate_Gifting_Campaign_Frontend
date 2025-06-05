import { Box, Grid } from "@mui/material";
import MessageInputBar from "../../../../../components/ChatInput/Index";
import ImageSelectionGallery from "./ImageGallery";

const UploadModal = ({ roomImages, classes, id, deleteRoomImage }) => {
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
            <MessageInputBar />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default UploadModal;
