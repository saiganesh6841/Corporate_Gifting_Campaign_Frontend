import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles/style";
import { on } from "@fluentui/react";
function ProfilePopOver({ image, title, role, onMouseLeave, onMouseEnter }) {
  const classes = useStyles();
  return (
    <Box className={classes.parent}>
      <Box
        className={classes.profileContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Box className={classes.flexBox}>
          <img
            src={image}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            alt="profile"
          />
          <Box
            sx={{
              marginLeft: "15px",
            }}
          >
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.role}>{role}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.pointer}></Box>
      <Box className={classes.extraPointerHider}></Box>
    </Box>
  );
}

export default ProfilePopOver;
