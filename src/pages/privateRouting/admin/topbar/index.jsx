import { AppBar, IconButton, Stack, Toolbar, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { Icon } from "@fluentui/react/lib/Icon";

import { AlertBadge24Regular } from "@fluentui/react-icons";
import { Logout } from "@mui/icons-material";
import useStyles from "./styles/style";
import floraImage from "../../../../assets/Images/floraName.png";

function TopBar(props) {
  const classes = useStyles();

  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };
  const closeModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div>
        <AppBar
          position="fixed"
          className={
            props.mobileOpen ? classes.appBarDrawerClose : classes.appBar
          }
        >
          <Toolbar className={classes.Toolbar}>
            {/* props.t("topNavBar.menu") */}
            <Tooltip ml={1} title={"menu"}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
              >
                <Icon iconName="Waffle" style={{ color: "white" }} />
              </IconButton>
            </Tooltip>

            <Stack className={classes.title}>
              <img
                className={classes.logo}
                // style={{ width: "100%", height: "100%" }}
                src={floraImage}
                alt="logo"
              />
            </Stack>

            {/* <Hidden only={["", "", "", ""]}> */}
            {/* <Tooltip
              ml={2}
              title={"Notification"}
              style={{ visibility: "hidden" }}
            >
              <IconButton>
                <AlertBadge24Regular style={{ color: "white" }} />
              </IconButton>
            </Tooltip> */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default TopBar;

// withTranslation("translations")
