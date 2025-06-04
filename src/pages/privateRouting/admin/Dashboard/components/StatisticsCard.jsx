import { Box } from "@mui/material";
import { PeopleTeam24Filled } from "@fluentui/react-icons";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import Typography from "../../../../../components/Text/Typogarphy";
import { FontSizes } from "@fluentui/react";

function StatisticsCard({
  classes,
  background,
  Icon,
  label,
  totalNumber,
  newlyAddedCount,
}) {
  return (
    <Box className={classes.statisticsCardContainer}>
      <Box className={classes.topBar}>
        <Typography
          variant="title"
          style={{
            color: background,
            fontWeight: 700,
            fontSize:"36px"
          }}
        >
          {totalNumber}
        </Typography>
        <Box
          className={classes.iconContainer}
          sx={{ backgroundColor: background, opacity: 0.5 }}
        >
          {Icon}
        </Box>
      </Box>

      <Typography
        style={{
          textTransform: "uppercase",
          color: background,
          fontSize:"16px",
          fontWeight:500
        }}
        variant="subHeading"
      >
        {label}
      </Typography>
      {/* <Typography
        variant="content"
        style={{
          color: "#ffff",
          display: "block",
          marginTop: "8px",
          textTransform: "capitalize",
        }}
      >
        {newlyAddedCount} New {label} Added
      </Typography> */}
    </Box>
  );
}

export default StatisticsCard;
