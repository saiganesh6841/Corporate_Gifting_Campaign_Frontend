import { Box, Grid, IconButton, Checkbox, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrimaryBtn from "../../../../../components/button";
import { ArrowDownloadFilled } from "@fluentui/react-icons";
import { useState } from "react";

const imageUrls = [
  "https://images.pexels.com/photos/6772668/pexels-photo-6772668.jpeg?cs=srgb&dl=pexels-gaspar-zaldo-6772668.jpg&fm=jpg",
  "https://images.pexels.com/photos/6772668/pexels-photo-6772668.jpeg?cs=srgb&dl=pexels-gaspar-zaldo-6772668.jpg&fm=jpg",
  "https://images.pexels.com/photos/6772668/pexels-photo-6772668.jpeg?cs=srgb&dl=pexels-gaspar-zaldo-6772668.jpg&fm=jpg",
  "https://images.pexels.com/photos/6772668/pexels-photo-6772668.jpeg?cs=srgb&dl=pexels-gaspar-zaldo-6772668.jpg&fm=jpg",
];

const ImageSelectionGallery = ({ Images }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (url) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  return (
    <Box className="box_container" sx={{ padding: "1rem" }}>
      {/* Download Button */}
      <Box sx={{ display: "flex", justifyContent: "end", padding: "10px" }}>
        <PrimaryBtn
          style={{
            width: "140px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          //   onClick={handleDownload}
          disabled={selected.length === 0}
        >
          <ArrowDownloadFilled />
          Download
        </PrimaryBtn>
      </Box>

      {/* Image Cards */}
      <Grid container spacing={2}>
        {imageUrls?.map((url, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={url}
                alt={`Design ${index + 1}`}
                style={{
                  width: "183px",
                  height: "183px",
                  objectFit: "fill",
                  display: "block",
                  borderRadius: "12px",
                }}
              />
              <Checkbox
                checked={selected.includes(url)}
                onChange={() => toggleSelect(url)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "4px",
                  backgroundColor: "#fff",
                  borderRadius: "20%",
                  "&:hover": {
                    backgroundColor: "#fff", // Prevent hover background change
                  },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageSelectionGallery;
