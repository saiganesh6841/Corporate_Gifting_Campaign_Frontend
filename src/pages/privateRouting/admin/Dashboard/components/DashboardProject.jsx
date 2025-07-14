import {
  CheckmarkStarburstRegular,
  DismissRegular,
  HourglassHalfRegular,
} from "@fluentui/react-icons";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../styles/style";
import { useNavigate } from "react-router-dom";

const DashboardProject = ({ services }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const formatDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getStatusStyles = (status) => {
    switch (status) {
      case "inprogress":
        return {
          icon: <HourglassHalfRegular color="#007AFF" fontSize="30px" />,
          label: "In Progress",
          color: "#007AFF",
          bg: "#007AFF29",
        };
      case "completed":
        return {
          icon: <CheckmarkStarburstRegular color="#00C652" fontSize="30px" />,
          label: "Completed",
          color: "#00C652",
          bg: "#00C65229",
        };
      default:
        return {
          icon: <DismissRegular color="#FF3B30" fontSize="30px" />,
          label: "Cancelled",
          color: "#FF3B30",
          bg: "#FF3B3029",
        };
    }
  };
  return (
    <Grid container spacing={5}>
      {services?.projects?.length === 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
          }}
        >
          <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
            No Datas
          </Typography>
        </Box>
      )}
      {services?.projects?.map((project) => {
        const status = getStatusStyles(project.status);
        return (
          <Grid item xs={6} sm={4} md={3} lg={4} key={project._id}>
            <Box
              className={classes.dashboardProjectContainer}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  {
                    pathname: "/admin/projects",
                    search: `?isOpen=true&divType=view&id=${project?._id}`,
                  },
                );
              }}
            >
              <img
                src={project?.uploadImage}
                alt="project"
                width="380px"
                height="200px"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <Typography
                sx={{ color: "#561E1E", fontWeight: 600, fontSize: "20px" }}
              >
                {capitalizeWords(project?.projectName)}
              </Typography>
              <Typography
                sx={{ color: "#7A8391", fontWeight: 400, fontSize: "14px" }}
              >
                {capitalizeWords(project?.location)}
              </Typography>
              <Box className={classes.startDateEndDateContainer}>
                <Typography
                  sx={{ color: "#362626", fontSize: "14px", fontWeight: 400 }}
                >
                  {formatDate(project.startDate)}
                </Typography>
                <Typography
                  sx={{
                    color: "#362626",
                    fontSize: "14px",
                    fontWeight: 400,
                    textAlign: "left",
                  }}
                >
                  {formatDate(project.endDate)}
                </Typography>
              </Box>
              <Box className={classes.startDateEndDateLabel}>
                <Typography
                  sx={{ color: "#7A8391", fontSize: "14px", fontWeight: 400 }}
                >
                  Start Date
                </Typography>
                <Typography
                  sx={{
                    color: "#7A8391",
                    fontSize: "14px",
                    fontWeight: 400,
                    textAlign: "left",
                  }}
                >
                  End Date
                </Typography>
              </Box>
              <Box className={classes.statusContainer}>
                <Box className={classes.assignedWorkersContainer}>
                  <Box>
                    <Typography className={classes.mainText}>
                      {project?.assignedWorkers?.length}
                    </Typography>
                    <Typography className={classes.subText}>
                      No.of Workers
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.mainText}>
                      {project?.tasks}
                    </Typography>
                    <Typography className={classes.subText}>
                      No.of Tasks
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: status?.bg,
                  }}
                  className={classes.statusContent}
                >
                  {status?.icon}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: status?.color,
                    }}
                  >
                    {status?.label}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardProject;
