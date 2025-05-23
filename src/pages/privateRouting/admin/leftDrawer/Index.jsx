import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles/style";
import { Logout } from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DialogModal from "../../../../components/Dialog/Index";
import ConfirmationModal from "../../../../components/ConfirmationModal/Index";
import useServices from "./hooks/useServices";
import Typography from "../../../../components/Text/Typogarphy";

const LeftDrawer = ({
  isMobile,
  menus,
  allowedMenus,
  handleCloseDrawer,
  handleOpenDrawer,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation(); // ✅ Use i18n translation hook
  const services = useServices();
  const [expandedMenus, setExpandedMenus] = useState([]);
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
      setExpandedMenus((prev) => prev.filter((item) => item !== index));
    } else {
      setExpandedMenus((prev) => [...prev, index]);
    }
  };

  return (
    <Stack
      className={`${classes.sideBarRoot} scroll__remove ${
        isMobile ? "collapsed" : ""
      }`}
      onMouseEnter={handleOpenDrawer}
      onMouseLeave={handleCloseDrawer}
    >
      <Stack
        className={classes.menuwrap}
        style={{ alignItems: isMobile && "center", height: "50%" }}
      >
        {menus?.map((value, key) => {
          if (!allowedMenus?.includes(value?.permissionLevel)) return;

          return (
            <React.Fragment key={key}>
              <Stack
                onClick={() => {
                  handleClick(key);
                  navigate(value?.link);
                  handleExpand(key);
                  handleClick(key);
                }}
                className={classes.menuRoot}
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
                  }}
                  onClick={(e) => {
                    navigate(value?.link);
                  }}
                >
                  {t(value?.display)}
                </Typography>
                {value?.isExpandIconVisible && (
                  <>
                    {expanded[key] ? (
                      <ExpandLessIcon
                        style={{
                          marginLeft: "auto",
                          display: isMobile ? "none" : "",
                          color:
                            (expandedMasterData &&
                              value?.stylesForExpandedMenu &&
                              value?.stylesForExpandedMenu(
                                path,
                                value?.display
                              )) ||
                            value?.link === path
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                        }}
                      />
                    ) : (
                      <ExpandMoreIcon
                        style={{
                          marginLeft: "auto",
                          display: isMobile ? "none" : "",
                          color:
                            (expandedMasterData &&
                              value?.stylesForExpandedMenu &&
                              value?.stylesForExpandedMenu(
                                path,
                                value?.display
                              )) ||
                            value?.link === path
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                        }}
                      />
                    )}
                  </>
                )}
              </Stack>

              {value?.subMenu?.map((itemValue, subIndex) => {
                if (!allowedMenus?.includes(itemValue?.permissionLevel)) return;

                return (
                  <React.Fragment key={subIndex}>
                    {expandedMenus.includes(key) && (
                      <Stack
                        onClick={() => {
                          setExpandedMasterData(true);
                          navigate(itemValue?.link);
                        }}
                        className={classes.menuRoot}
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
                          {t(itemValue?.display)}
                        </Typography>
                      </Stack>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}

        <div
          className={classes.logout}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <Logout className={classes.logoutIcon} sx={{ fill: "red" }} />
          <Typography variant="heading" style={{ color: "red" }}>
            {!isMobile && "Logout"}
          </Typography>
        </div>
        <ConfirmationModal
          isOpen={isLogoutModalOpen}
          onDismissModal={() => setIsLogoutModalOpen(false)}
          title={"Logout"}
          content={"Are you sure you want to logout?"}
          Button={"Logout"}
          onClick={services?.logoutFunction}
        />
      </Stack>
    </Stack>
  );
};

export default LeftDrawer;
