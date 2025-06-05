import { Box, Grid, IconButton, Checkbox, Button } from "@mui/material";
import PrimaryBtn from "../../../../../components/button";
import { ArrowDownloadFilled, Delete20Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { downloadImages } from "../../../../../utils/download";
import ConfirmationModal from "../../../../../components/ConfirmationModal/Index";

const ImageSelectionGallery = ({ classes, Images, id, deleteRoomImage }) => {
  const [selected, setSelected] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleSelect = (url) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleDelete = (id, selected) => {
    deleteRoomImage(id, selected);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Box className="box_container" sx={{ padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "10px",
            gap: "10px",
          }}
        >
          <PrimaryBtn
            style={{
              width: "140px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            onClick={() => setIsDeleteOpen(true)}
            disabled={selected.length === 0}
          >
            <Delete20Regular />
            Delete
          </PrimaryBtn>
          <PrimaryBtn
            style={{
              width: "140px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            onClick={() => downloadImages(selected)}
            disabled={selected.length === 0}
          >
            <ArrowDownloadFilled />
            Download
          </PrimaryBtn>
        </Box>

        {/* Image Cards */}
        <Grid container spacing={2}>
          {Images?.map((url, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box className={classes.fitImage}>
                <img
                  src={url?.url}
                  alt={`Design ${index + 1}`}
                  className={classes.imageSize}
                />
                <Checkbox
                  checked={selected.includes(url?.url)}
                  onChange={() => toggleSelect(url?.url)}
                  className={classes.imageCheckbox}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onDismissModal={() => setIsDeleteOpen(false)}
        title={"Delete Images"}
        content={`Are you sure you want to delete Images}?`}
        Button={"Delete"}
        onClick={() => handleDelete(id, selected)}
      />
    </>
  );
};

export default ImageSelectionGallery;
