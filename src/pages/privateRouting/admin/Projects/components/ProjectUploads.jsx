import { Box, Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import PrimaryBtn from "../../../../../components/button";
import { useState } from "react";
import OnRenderFooterContent from "../../../../../components/panelFooter/Footer";
import { PanelConfirmation } from "../../../../../components/confirmationpanel/Index";
import ImageSelectionGallery from "./ImageGallery";
import UploadModal from "./UploadModal";
import DefaultButton from "../../../../../components/DefaultButton/Index";

const ProjectUpload = ({ classes, openForm, services }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const dismissUpload = () => {
    setIsUploadOpen(false);
  };
  return (
    <>
      <Grid container spacing={2} marginTop="20px">
        <Grid item xs={12}>
          <Box className="box_container" sx={{ padding: "10px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                overflow: "auto",
                scrollbarWidth: "none",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8]?.map((val) => (
                <DefaultButton variant="primary" style={{ minWidth: "150px" }}>
                  Living Room
                </DefaultButton>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {services?.viewRoomData?.map((val) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={val}
                onClick={() => setIsUploadOpen(true)}
              >
                <ImageCard classes={classes} data={val} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <PanelConfirmation
        isNoFooter={openForm?.divType === "column"}
        isOpen={isUploadOpen}
        title="Uploads"
        width={800}
        hasCloseButton={openForm?.hasCloseButton}
        dismissPanel={dismissUpload}
        onRenderFooterContent={() => (
          <OnRenderFooterContent
            field2={{
              text: openForm?.divType === "view" ? "Close" : "Reset",
              handle:
                openForm?.divType === "view" ? dismissUpload : dismissUpload,
            }}
          />
        )}
      >
        <UploadModal />
      </PanelConfirmation>
    </>
  );
};
export default ProjectUpload;
