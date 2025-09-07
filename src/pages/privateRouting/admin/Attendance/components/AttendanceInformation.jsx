import { Box } from "@mui/material";
import { Persona } from "@fluentui/react-components";
import Typography from "../../../../../components/Text/Typogarphy";
import utilController from "../../../../../utils/Utilcontroller";

const AttendanceInformation = ({ classes, data }) => {
  console.log(data, "data");
  return (
    <Box className={classes.cardStyle}>
      {/* Left Side: Avatar + Name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Persona
          name={data?.userDetails?.fullName}
          secondaryText={data?.userDetails?.userType}
          avatar={{
            image: { src: data?.userDetails?.profileImage },
            shape: "square",
          }}
        />
      </Box>

      {/* Middle Section */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: "12px" }}>
        <Box className={classes.rowDiffStyle}>
          {/* <Box className={classes.fieldStyle}>
            <Typography variant="content">Location</Typography>
            <Typography variant="subHeading">Mumbai Office</Typography>
          </Box> */}
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Email</Typography>
            <Typography variant="subHeading">
              {data?.userDetails?.email}
            </Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">User ID</Typography>
            <Typography variant="subHeading">
              {data?.userDetails?.userId}
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box className={classes.rowDiffStyle}>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Last Check-in</Typography>
            {/* <Typography variant="subHeading">Today, 9:15 AM</Typography> */}
            <Typography variant="subHeading">
              {utilController.getFormattedDateandTime(
                data?.result?.[data?.result?.length - 1]?.checkIn
              )}
            </Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Days Present </Typography>
            <Typography variant="subHeading">{data?.present} Days</Typography>
          </Box>
          <Box className={classes.fieldStyle}>
            <Typography variant="content">Total Absences</Typography>
            <Typography variant="subHeading">{data?.absents} Days</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceInformation;
