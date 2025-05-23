import { Box } from "@mui/material";
import { PeopleTeam24Filled } from "@fluentui/react-icons";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import Typography from "../../../../../components/Text/Typogarphy";

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
          style={{
            textTransform: "uppercase",
            color: "#fff",
          }}
          variant="subHeading"
        >
          TOTAL {label}
        </Typography>
        <Box className={classes.iconContainer}>{Icon}</Box>
      </Box>
      <Typography
        variant="title"
        style={{
          color: "#ffff",
          fontWeight: "700",
        }}
      >
        {totalNumber}
      </Typography>
      <Typography
        variant="content"
        style={{
          color: "#ffff",
          display: "block",
          marginTop: "8px",
          textTransform: "capitalize",
        }}
      >
        {newlyAddedCount} New {label} Added
      </Typography>
    </Box>
  );
}

export default StatisticsCard;
