import { Box } from "@mui/material";
import CustomDropdown from "../../../../../components/CustomDropdown/Index";
import Typography from "../../../../../components/Text/Typogarphy";

const ProjectBar = ({ classes }) => {
  return (
    <Box className={classes.projectBar}>
      <Typography variant="heading">Luxury Villa Renovation</Typography>
      <CustomDropdown initialStatus="inprogress" disabled={true} />
    </Box>
  );
};
export default ProjectBar;
