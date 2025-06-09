import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Icon } from "@fluentui/react/lib/Icon";

import { AlertBadge24Regular } from "@fluentui/react-icons";
import { Logout } from "@mui/icons-material";
import useStyles from "./styles/style";
import floraImage from "../../../../assets/Images/floraName.png";
import { useTheme } from "@mui/styles";
import LocalStorage from "../../../../config/LocalStorage";

function TopBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  // const openLogoutModal = () => {
  //   setShowLogoutModal(true);
  // };
  // const closeModal = () => {
  //   setShowLogoutModal(false);
  // };

  return (
    <>
      {/* <div style={{ margin: "16px" }}>
        <AppBar
          position="fixed"
          className={
            props.mobileOpen ? classes.appBarDrawerClose : classes.appBar
          }
        >
          <Toolbar className={classes.Toolbar}>

            <Stack className={classes.title}>
              <img
                className={classes.logo}
                // style={{ width: "100%", height: "100%" }}
                src={floraImage}
                alt="logo"
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Box textAlign="right">
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    fontSize: "16px",
                    // fontFamily: "Manrope",
                  }}
                >
                  {LocalStorage?.userDetails?.email}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.palette.primary.main}
                  fontSize={"12px"}
                  // fontFamily={"Manrope"}
                >
                  {" "}
                  {LocalStorage?.userDetails?.email}
                </Typography>
              </Box>
              <Avatar
                src={LocalStorage?.userDetails?.profileImage}
                alt="profile"
                sx={{ width: 36, height: 36 }}
              />
            </Stack>
          </Toolbar>
        </AppBar>
      </div> */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          margin: "16px",
          borderRadius: "15px",
          backgroundColor: "#FFFFFF",
          minHeight: theme.topNavbar.height,
          boxShadow: theme.shadows[2],
        }}
      >
        <Toolbar className={classes.Toolbar}>
          <Stack className={classes.title}>
            <img className={classes.logo} src={floraImage} alt="logo" />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Box textAlign="right">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  fontSize: "16px",
                }}
              >
                {LocalStorage?.userDetails?.name}
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.primary.main}
                fontSize={"12px"}
              >
                {LocalStorage?.userDetails?.email}
              </Typography>
            </Box>
            <Avatar
              src={LocalStorage?.userDetails?.profileImage}
              alt="profile"
              sx={{ width: 36, height: 36 }}
            />
          </Stack>
        </Toolbar>
      </Box>
    </>
  );
}

export default TopBar;

// withTranslation("translations")
