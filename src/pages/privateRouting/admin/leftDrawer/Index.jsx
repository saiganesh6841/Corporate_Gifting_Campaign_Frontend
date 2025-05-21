import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useStyles } from "./styles/style";

import { Logout } from "@mui/icons-material";
import ReusableDialog from "../../../../components/dialog/ReusableDialog";
import PrimaryBtn from "../../../../components/Button/PrimaryBtn";
import { store } from "../../../..";

const LeftDrawer = ({
  isMobile,
  menus,
  translate,
  allowedMenus,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const history = useHistory();
  const path = history.location.pathname;
  const classes = useStyles();
  const theme = useTheme();

  const [expandedMenus, setExpandedMenus] = React.useState([]);
  const [expandedMasterData, setExpandedMasterData] = useState(true);

  const [expanded, setExpanded] = useState({});

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleExpand = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const handleClick = (index) => {
    setExpandedMasterData(false);

    if (expandedMenus.includes(index)) {
      setExpandedMenus((prevExpandedMenus) =>
        prevExpandedMenus.filter((item) => item !== index)
      );
    } else {
      setExpandedMenus((prevExpandedMenus) => [...prevExpandedMenus, index]);
    }
  };
  return (
    <Stack
      className={`${classes.sideBarRoot} scroll__remove ${
        isMobile ? "collapsed" : ""
      }`}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <Stack
        className={classes.menuwrap}
        style={{ alignItems: isMobile && "center", height: "50%" }}
      >
        {menus?.map((value, key) => {
          if (!allowedMenus?.includes(value?.permissionLevel)) return;
          const mainPath = history?.location?.pathname?.split("/");
          mainPath?.pop();

          return (
            <React.Fragment>
              <Stack
                onClick={() => {
                  handleClick(key); // Pass the correct index (key) here
                  history?.replace(value?.link);
                  handleExpand(key);
                  handleClick(key);
                }}
                className={classes.menuRoot}
                key={key}
                style={{
                  alignItems: isMobile && "center",
                }}
              >
                <Stack
                  className={classes.menuLeft}
                  style={{
                    visibility:
                      !(
                        (expandedMasterData &&
                          value?.stylesForExpandedMenu &&
                          value?.stylesForExpandedMenu(path, value?.display)) ||
                        value?.link === path
                      ) && "hidden",
                  }}
                />
                {(expandedMasterData &&
                  value?.stylesForExpandedMenu &&
                  value?.stylesForExpandedMenu(path, value?.display)) ||
                value?.link === path
                  ? React.cloneElement(value?.filledIcon, {
                      style: { color: theme.palette.primary.main },
                    })
                  : React.cloneElement(value?.regularIcon, {
                      style: { color: theme.palette.secondary.main },
                    })}

                <Typography
                  variant="subtitle1"
                  className={classes.profileText}
                  style={{
                    fontWeight:
                      (expandedMasterData &&
                        value?.stylesForExpandedMenu &&
                        value?.stylesForExpandedMenu(path, value?.display)) ||
                      value?.link === path
                        ? 700
                        : "normal",
                    color:
                      value?.link === path
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,

                    display: isMobile && "none",
                    fontFamily: "Work Sans",
                  }}
                  onClick={() => {
                    history?.push(value?.link);
                    handleClick();
                    handleExpand();
                  }}
                >
                  {translate(value?.display)}
                </Typography>
              </Stack>

              {value?.subMenu?.map((itemValue, subIndex) => {
                if (!allowedMenus?.includes(itemValue?.permissionLevel)) return;

                return (
                  <>
                    <React.Fragment key={subIndex}>
                      {expandedMenus.includes(key) && (
                        <Stack
                          onClick={() => {
                            setExpandedMasterData(true);
                            history?.push(itemValue?.link);
                          }}
                          className={classes.menuRoot}
                          key={key}
                          style={{
                            alignItems: isMobile && "center",
                            marginLeft: isMobile ? "" : "1rem",
                          }}
                        >
                          {itemValue?.link === path
                            ? React.cloneElement(itemValue?.filledIcon, {
                                style: { color: theme.palette.primary.main },
                              })
                            : React.cloneElement(itemValue?.regularIcon, {
                                style: { color: theme.palette.secondary.main },
                              })}

                          <Typography
                            variant="subtitle1"
                            className={classes.profileText}
                            style={{
                              fontWeight: itemValue?.link === path && 700,
                              color:
                                itemValue?.link === path
                                  ? theme.palette.primary.main
                                  : theme.palette.secondary.main,
                              display: isMobile && "none",
                              fontFamily: "Work Sans",
                            }}
                          >
                            {translate(itemValue?.display)}
                          </Typography>
                        </Stack>
                      )}
                    </React.Fragment>
                  </>
                );
              })}
            </React.Fragment>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "24px",
            marginLeft: "16px",
            marginTop: "60px",
            paddingBottom: "30px",
            // backgroundColor: theme.palette.secondary.main,
            width: "100%",
          }}
        >
          <Logout
            className={classes.logoutIcon}
            sx={{
              fill: "red",
            }}
            onClick={() => setIsLogoutModalOpen(true)}
          />
        </div>
      </Stack>

      <ReusableDialog
        title="Logout"
        isOpen={isLogoutModalOpen}
        onDismissModal={() => setIsLogoutModalOpen(false)}
        zIndex={999999999}
      >
        <div style={{}}>
          <Typography
            sx={{
              margin: "16px 0px",
              fontSize: "18px",
            }}
          >
            Are you sure you want to logout?
          </Typography>

          <div
            style={{
              textAlign: "end",
              gap: "12px",
            }}
          >
            <PrimaryBtn
              variant="outlined"
              style={{
                padding: "8px 16px",
              }}
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </PrimaryBtn>
            <PrimaryBtn
              style={{
                padding: "8px 16px",
              }}
              onClick={() => {
                store.dispatch({ type: "LOGOUT" });
              }}
            >
              Logout
            </PrimaryBtn>
          </div>
        </div>
      </ReusableDialog>
    </Stack>
  );
};

export default LeftDrawer;
