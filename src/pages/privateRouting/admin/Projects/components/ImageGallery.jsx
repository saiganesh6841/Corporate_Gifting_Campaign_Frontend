import { Box, Grid, IconButton, Checkbox, Button } from "@mui/material";
import PrimaryBtn from "../../../../../components/button";
import { ArrowDownloadFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { downloadImages } from "../../../../../utils/download";

const ImageSelectionGallery = ({ classes, Images }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (url) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  console.log(selected, "selected");

  return (
    <Box className="box_container" sx={{ padding: "1rem" }}>
      <Box sx={{ display: "flex", justifyContent: "end", padding: "10px" }}>
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
  );
};

export default ImageSelectionGallery;
