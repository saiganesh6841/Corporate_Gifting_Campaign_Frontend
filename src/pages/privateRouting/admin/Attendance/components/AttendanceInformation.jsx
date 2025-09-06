import { Box } from "@mui/material";
import { Persona } from "@fluentui/react-components";
import Typography from "../../../../../components/Text/Typogarphy";

const AttendanceInformation = ({ classes }) => {
  return (
    <Box className={classes.cardStyle}>
      {/* Left Side: Avatar + Name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Persona
          name="Girish Jewargi"
          secondaryText="Worker"
          avatar={{
            image: { src: "https://randomuser.me/api/portraits/men/32.jpg" },
            shape: "square", // 👈 makes avatar square
          }}
        />
      </Box>

      {/* Middle Section */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
        <Box className={classes.rowDiffStyle}>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Location</Typography>
            <Typography variant="subHeading">Mumbai Office</Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Email</Typography>
            <Typography variant="subHeading">
              priya.sarpanch@company.com
            </Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">User ID</Typography>
            <Typography variant="subHeading">#EMP-2024-0156</Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box className={classes.rowDiffStyle}>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Last Check-in</Typography>
            <Typography variant="subHeading">Today, 9:15 AM</Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Days Present (Jan)</Typography>
            <Typography variant="subHeading">18 days</Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Total Absences</Typography>
            <Typography variant="subHeading">3 days</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceInformation;
