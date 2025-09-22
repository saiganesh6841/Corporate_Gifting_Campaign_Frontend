import { Box } from "@mui/material";
import CustomDropdown from "../../../../../components/CustomDropdown/Index";
import Typography from "../../../../../components/Text/Typogarphy";

const ProjectBar = ({ userForm, classes, status, setStatus }) => {
  return (
    <Box className={classes.projectBar}>
      <Typography variant="heading">
        {userForm?.projectName ? userForm?.projectName : "-"}
      </Typography>
      <CustomDropdown
        hideOptions={["pending"]}
        initialStatus={status}
        onChange={(newStatus) => {
          setStatus(newStatus);
        }}
      />
    </Box>
  );
};
export default ProjectBar;
