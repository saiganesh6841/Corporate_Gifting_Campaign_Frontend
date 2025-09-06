import { Box, Divider } from "@mui/material";
import Typography from "../../../../../components/Text/Typogarphy";

const DetailRow = ({ label, value, isBold = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "4px",
      }}
    >
      <Typography variant="content">{label}</Typography>
      <Typography variant={isBold ? "boldSmallStyle" : "content"}>
        {value}
      </Typography>
    </Box>
  );
};

const AttendanceDetails = ({ classes }) => {
  return (
    <Box className={classes.detailStyle}>
      {/* Date & Day */}
      <Typography variant="heading">January 25, 2024</Typography>
      <Typography variant="content" sx={{ color: "gray" }}>
        Thursday
      </Typography>

      {/* Check-in & Check-out */}
      <DetailRow label="Check-In" value="9:15 AM" isBold />
      <DetailRow label="Check-Out" value="6:30 PM" isBold />

      <Divider sx={{ marginY: "8px" }} />

      {/* Details */}
      <DetailRow label="Total Hours" value="9h 15m" isBold />
      <DetailRow label="Location" value="Mumbai Office" isBold />
      <DetailRow label="Project" value="Villa" isBold />
      <DetailRow label="Supervisor" value="Rajesh Kumar" isBold />

      {/* Check in/out logs */}
      <Box sx={{ marginTop: "8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="content">Check - in</Typography>
              <Typography
                variant="content"
                sx={{ color: "gray", fontSize: "14px" }}
              >
                Arrival Time at Site
              </Typography>
            </Box>
          </Box>
          <Typography variant="boldSmallStyle" sx={{ marginLeft: "auto" }}>
            9:00 AM
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "6px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="content">Check - Out</Typography>
              <Typography
                variant="content"
                sx={{ color: "gray", fontSize: "14px" }}
              >
                Leaving Time at Site
              </Typography>
            </Box>
          </Box>
          <Typography variant="boldSmallStyle" sx={{ marginLeft: "auto" }}>
            6:00 PM
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceDetails;
