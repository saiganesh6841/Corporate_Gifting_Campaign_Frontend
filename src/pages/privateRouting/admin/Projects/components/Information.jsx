import { Dropdown, Option, Persona } from "@fluentui/react-components";
import { Box } from "@mui/material";
import { getStatusStyles } from "../../../../../utils/StatusColor";
import Typography from "../../../../../components/Text/Typogarphy";
import utilController from "../../../../../utils/Utilcontroller";
import CustomDropdown from "../../../../../components/CustomDropdown/Index";

const ProjectInformation = ({ classes, userForm, setUserForm, disabled }) => {
  return (
    <>
      <Box className="box_container" sx={{ padding: "1rem" }}>
        <Box className={classes.spaceBetween}>
          <Persona
            name={userForm?.supervisorName}
            secondaryText={userForm?.supervisorMobile}
            avatar={{
              image: {
                src: userForm?.supervisorImage,
              },
            }}
          />
          {/* <Box sx={getStatusStyles("pending")}>{userForm?.status}</Box> */}
          <Box>
            <CustomDropdown
              initialStatus={userForm?.status}
              disabled={disabled}
              onChange={(newStatus) => {
                setUserForm((prev) => ({
                  ...prev,
                  status: newStatus,
                }));
              }}
            />
          </Box>
        </Box>
        <hr style={{ width: "100%", color: "#CCCCCC", opacity: 0.5 }} />
        <Box className={classes.spaceBetween} sx={{ marginBottom: "4px" }}>
          <Box>
            <Typography variant="content">Project Name :-</Typography>
            <Typography variant="subHeading">
              {userForm?.projectName}
            </Typography>
          </Box>
          <Typography variant="content">
            Start Date: {utilController.getDate(userForm?.startDate)}
          </Typography>
        </Box>
        <Box className={classes.spaceBetween} sx={{ marginBottom: "4px" }}>
          <Box>
            <Typography variant="content">Project Location :-</Typography>
            <Typography variant="subHeading">{userForm?.location}</Typography>
          </Box>
          <Typography variant="content">
            End Date Date: {utilController.getDate(userForm?.endDate)}
          </Typography>
        </Box>
        <Box className={classes.spaceBetween} sx={{ marginBottom: "4px" }}>
          <Box>
            <Typography variant="content">Client Name :-</Typography>
            <Typography variant="subHeading">{userForm?.clientName}</Typography>
          </Box>
        </Box>
        <Box className={classes.spaceBetween}>
          <Box>
            <Typography variant="content">Client Details :-</Typography>
            <Typography variant="subHeading">
              {userForm?.mobileNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ProjectInformation;
