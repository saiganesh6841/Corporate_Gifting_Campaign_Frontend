import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Icon } from "@fluentui/react/lib/Icon";

import { DefaultButton, PrimaryButton } from "@fluentui/react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from "@fluentui/react-components";
import { AlertBadge24Regular } from "@fluentui/react-icons";
import { Logout } from "@mui/icons-material";
import { useStyles } from "./styles/style";

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
            <Tooltip ml={1} title={props.t("topNavBar.menu")}>
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
                // src={images.companyLogo}
                src={images.smileJi_logo}
                alt="logo"
              />
            </Stack>

            {/* <Hidden only={["", "", "", ""]}> */}
            <Tooltip
              ml={2}
              title={"Notification"}
              style={{ visibility: "hidden" }}
            >
              <IconButton>
                <AlertBadge24Regular style={{ color: "white" }} />
              </IconButton>
            </Tooltip>

            <Tooltip ml={2} title={props.t("topNavBar.logout")}>
              <IconButton onClick={openLogoutModal}>
                <Logout className={classes.logoutIcon} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </div>
      {/* Here we are implementing the dialog box for logout */}

      <Dialog open={showLogoutModal}>
        <DialogSurface
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            padding: 0,
            border: "none",
            maxWidth: "500px",
          }}
        >
          <DialogTitle
            style={{
              fontFamily: "Segoe UI",
              background: "#fff",
              display: "flex",
              padding: "16px 16px 0px 16px",
            }}
          >
            <Typography
              variant="large"
              style={{
                fontFamily: "Segoe UI",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Logout
            </Typography>
          </DialogTitle>
          <DialogBody style={{ padding: "16px", paddingTop: "0px" }}>
            <DialogContent style={{ fontFamily: "Segoe UI", fontWeight: 300 }}>
              <Typography style={{ fontWeight: "400", fontFamily: "Segoe UI" }}>
                Are you sure you want to logout?
              </Typography>
            </DialogContent>
            <DialogActions>
              {/* <Button
                appearance="secondary"
                style={{
                  background: "white",
                  color: "black",
                  borderRadius: "4px",
                  border: "1px solid black",
                  height: "30px",
                  width: "90px",
                }}
                onClick={closeModal}
              >
                <Typography appearance="secondary" style={{ fontFamily: "Segoe UI" }}>
                  Cancel
                </Typography>
              </Button> */}
              <DefaultButton
                styles={{ marginRight: 8, border: "none", fontWeight: 600 }}
                onClick={closeModal}
              >
                Cancel
              </DefaultButton>

              <PrimaryButton
                styles={{ marginRight: 8, border: "none", fontWeight: 600 }}
                onClick={() => props.logout()}
              >
                Logout
              </PrimaryButton>
              {/* <Button
                appearance="primary"
                style={{
                  background: "#1EA5FC",
                  color: "white",
                  borderRadius: "4px",
                  height: "30px",
                  width: "90px",
                }}
                onClick={() => props.logout()}
              >
                <Typography style={{ fontFamily: "Segoe UI" }}>
                  Logout
                </Typography>
              </Button> */}
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}

export default withTranslation("translations")(TopBar);
