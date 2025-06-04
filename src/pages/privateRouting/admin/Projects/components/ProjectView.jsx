import { Box, Grid } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";
import ProjectInformation from "./Information";
import { Stack } from "@fluentui/react";
import {
  Combobox,
  Dropdown,
  Option,
  Persona,
} from "@fluentui/react-components";
import RoomLogo from "../../../../../components/RoomLogo/Index";
import { CommentNote20Regular } from "@fluentui/react-icons";
import { useTheme } from "@mui/styles";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import { PanelConfirmation } from "../../../../../components/confirmationpanel/Index";
import OnRenderFooterContent from "../../../../../components/panelFooter/Footer";
import ProjectUpload from "./ProjectUploads";
import useTableHeader from "../TableHeader";
import useTable from "../hooks/useTable";
import TableComponent from "../../../../../components/Table/Table";
import Pagination from "../../../../../components/Table/Pagination";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import Header from "../../../../../components/HeaderUi/Index";
import Toolbar from "../../../../../components/EnhancedToolbar/Toolbar";

const ProjectView = ({
  classes,
  openForm,
  userForm,
  services,
  setQuery,
  query,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { workerColumns } = useTableHeader();
  const { viewColumn } = useTable(workerColumns);
  const dismiss = () => {
    setIsOpen(false);
  };
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const [data, setData] = useState({
    floorNo: "",
    floorId: "",
    flatId: "",
    flatNo: "",
  });

  useEffect(() => {
    if (data.floorId && data?.flatId) {
      services?.roomDropdown(data.floorId, data?.flatId);
    }
  }, [data]);

  const handleRoomClick = (roomId) => {
    setIsOpen(true);
    handleRoomSelect(roomId);
  };

  const handleRoomSelect = (roomId, timestamp) => {
    setSelectedRoomId(roomId);
    services?.viewRoomImageData(data?.flatId, roomId, timestamp);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProjectInformation
            classes={classes}
            userForm={userForm}
            disabled={openForm?.divType === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box className="box_container" sx={{ padding: "1rem" }}>
            <Box className={classes.spaceBetween}>
              <Typography variant="heading">
                Rooms{" "}
                <span style={{ color: "gray", fontWeight: 400 }}>
                  ({services?.roomData?.length})
                </span>
              </Typography>
              <Stack horizontal gap={4}>
                <Dropdown
                  placeholder="Floor"
                  style={{ width: "100px", minWidth: "unset" }}
                  onClick={() => services?.floorsDropdown()}
                  value={data?.floorNo}
                  onOptionSelect={(e, data) => {
                    setData((prev) => ({
                      ...prev,
                      floorId: data.optionValue,
                      floorNo: data?.optionText,
                      flatId: "",
                      flatNo: "",
                    }));
                  }}
                >
                  {services?.floorList?.map((item) => (
                    <Option
                      key={item?._id}
                      value={item?._id}
                      text={item?.floor}
                    >
                      {item?.floor}
                    </Option>
                  ))}
                </Dropdown>
                <Combobox
                  placeholder="Flat"
                  style={{ width: "100px", minWidth: "unset" }}
                  onClick={() => services?.flatDropdown(data?.floorId)}
                  value={data?.flatNo}
                  onOptionSelect={(e, data) => {
                    setData((prev) => ({
                      ...prev,
                      flatId: data.optionValue,
                      flatNo: data.optionText,
                    }));
                  }}
                >
                  {services?.flatList?.map((item) => (
                    <Option key={item?._id} value={item?._id} text={item?.flat}>
                      {item?.flat}
                    </Option>
                  ))}
                </Combobox>
              </Stack>
            </Box>
            <br />
            <Box sx={{ display: "flex", gap: "16px" }}>
              {/* <RoomLogo color="#E8E4C4" onClick={() => setIsOpen(true)} />
              <RoomLogo color="#E8E4C4" />
              <RoomLogo color="#E8E4C4" /> */}
              {services?.roomData?.map((item) => (
                <RoomLogo
                  color={item?.color}
                  roomLogo={item?.roomLogo}
                  roomName={item?.roomName}
                  onClick={() => handleRoomClick(item?._id)}
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Box className="box_container" sx={{ padding: "1rem" }}>
          <Typography variant="title">
            Workers{" "}
            <span style={{ color: "gray", fontWeight: 500 }}>
              ({services?.workerData?.filterRecords})
            </span>
          </Typography>
          <Toolbar
            classes={classes}
            themeColor={theme?.palette?.primary?.main}
            setQuery={setQuery}
            showSearch={true}
          />

          <FluentProvider theme={teamsLightTheme}>
            <Stack
              style={{
                marginTop: "1rem",
                boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: "15px",
              }}
              className="tablegrid"
            >
              <TableComponent
                items={services?.workerData?.rows || []}
                columns={workerColumns}
                multiselect={false}
                viewColumn={viewColumn}
                selectedRows={[]}
              />
            </Stack>
            <Pagination
              query={query}
              setQuery={setQuery}
              tableData={services?.workerData}
            />
          </FluentProvider>
        </Box>
      </Grid>

      <PanelConfirmation
        isNoFooter={openForm?.divType === "column"}
        isOpen={isOpen}
        title="Project Uploads"
        width={900}
        hasCloseButton={openForm?.hasCloseButton}
        dismissPanel={dismiss}
        onRenderFooterContent={() => (
          <OnRenderFooterContent
            field2={{
              text: openForm?.divType === "view" ? "Close" : "Reset",
              handle: openForm?.divType === "view" ? dismiss : dismiss,
            }}
          />
        )}
      >
        <ProjectUpload
          classes={classes}
          openForm={openForm}
          services={services}
          roomData={services?.roomData}
          selectedRoomId={selectedRoomId}
          handleRoomSelect={handleRoomSelect}
        />
      </PanelConfirmation>
    </>
  );
};
export default ProjectView;
