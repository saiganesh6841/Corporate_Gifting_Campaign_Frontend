import { Box, Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import PrimaryBtn from "../../../../../components/button";
import { useRef, useState } from "react";
import OnRenderFooterContent from "../../../../../components/panelFooter/Footer";
import { PanelConfirmation } from "../../../../../components/confirmationpanel/Index";
import UploadModal from "./UploadModal";
import DefaultButton from "../../../../../components/DefaultButton/Index";
import {
  Calendar20Regular,
  Calendar24Regular,
  Dismiss20Regular,
  Dismiss24Regular,
  DismissRegular,
} from "@fluentui/react-icons";
import { useTheme } from "@mui/styles";
import { format, subDays } from "date-fns";
import { Text } from "@fluentui/react";
import { Calendar } from "@fluentui/react-calendar-compat";

const ProjectUpload = ({
  classes,
  openForm,
  services,
  roomData,
  selectedRoomId,
  handleRoomSelect,
}) => {
  const theme = useTheme();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [roomImages, setRoomImages] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dismissUpload = () => {
    setIsUploadOpen(false);
    setRoomImages([]);
  };
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const pastWeekDates = Array.from({ length: 8 }, (_, i) =>
    subDays(new Date(), i)
  );

  const handleUpload = (data) => {
    setIsUploadOpen(true);
    setRoomImages(data);
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
              {selectedDate &&
                !pastWeekDates.some(
                  (d) =>
                    format(d, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                ) && (
                  <DefaultButton
                    variant="primary"
                    style={{
                      minWidth: "150px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onClick={() => {
                      if (selectedDate) {
                        const timestamp = Math.floor(
                          selectedDate.getTime() / 1000
                        );
                        handleRoomSelect(selectedRoomId, timestamp);
                      }
                    }}
                  >
                    {format(selectedDate, "d MMMM yyyy")}

                    <Dismiss20Regular
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(null);
                        // setIsCalendarOpen(false);
                        if (selectedRoomId) {
                          handleRoomSelect(selectedRoomId);
                        }
                      }}
                    />
                  </DefaultButton>
                )}
              <DefaultButton variant="outlined" style={{ width: "60px" }}>
                <Calendar20Regular
                  color={theme.palette.primary.main}
                  onClick={() => setIsCalendarOpen((open) => !open)}
                />
              </DefaultButton>
              {isCalendarOpen && (
                <Box ref={calendarRef} className={classes.calendarShow}>
                  <Calendar
                    showMonthPickerAsOverlay
                    highlightSelectedMonth
                    showGoToToday={false}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                      if (selectedRoomId) {
                        const timestamp = Math.floor(date.getTime() / 1000);
                        handleRoomSelect(selectedRoomId, timestamp);
                      }
                    }}
                    value={selectedDate || new Date()}
                    // onSelectDate={onSelectDate}
                    // value={selectedDate}
                  />
                </Box>
              )}

              {pastWeekDates.map((date, index) => {
                const isSelected =
                  selectedDate &&
                  format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd");
                const timestamp = Math.floor(date.getTime() / 1000);

                return (
                  <DefaultButton
                    key={index}
                    variant={isSelected ? "primary" : "outlined"}
                    style={{ minWidth: "150px" }}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDate(null);
                        if (selectedRoomId) {
                          handleRoomSelect(selectedRoomId);
                        }
                      } else {
                        setSelectedDate(date);
                        if (selectedRoomId) {
                          handleRoomSelect(selectedRoomId, timestamp);
                        }
                      }
                    }}
                  >
                    {format(date, "d MMMM yyyy")}
                  </DefaultButton>
                );
              })}
            </Box>
          </Box>
        </Grid>
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
              {roomData?.length > 0 ? (
                roomData?.map((val) => (
                  <DefaultButton
                    variant={
                      selectedRoomId === val._id ? "primary" : "outlined"
                    }
                    onClick={() => {
                      if (selectedRoomId === val._id) return;
                      const timestamp = selectedDate
                        ? Math.floor(selectedDate.getTime() / 1000)
                        : null;
                      handleRoomSelect(val._id, timestamp);
                    }}
                    style={{ minWidth: "150px", maxWidth: "200px" }}
                  >
                    {val?.roomName}
                  </DefaultButton>
                ))
              ) : (
                <Text>No Rooms Avaliable</Text>
              )}
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
                onClick={() => handleUpload(val?.roomImages)}
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
        <UploadModal roomImages={roomImages} classes={classes} />
      </PanelConfirmation>
    </>
  );
};
export default ProjectUpload;
