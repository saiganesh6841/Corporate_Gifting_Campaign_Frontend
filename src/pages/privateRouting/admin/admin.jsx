import React, { useMemo, useState } from "react";
import Topbar from "./topbar";
import LeftDrawer from "./leftDrawer/Index";
import SideBarMenu from "../../../config/SideBarMenu.jsx";
import LocalStorage from "../../../config/LocalStorage.js";

function Admin(props) {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const handleCloseDrawer = () => {
    setMobileOpen(true);
  };
  const handleOpenDrawer = () => {
    setMobileOpen(false);
  };

  const [allowedMenus, setAllowedMenus] = useState([]);
  useMemo(() => {
    let result = [];
    if (LocalStorage.userDetails?.permission?.active) {
      result = LocalStorage.userDetails?.permission?.permission
        ?.filter((v) => v?.enable)
        ?.map((value) => value?.label);
    }
    setAllowedMenus(result);
  }, []);
  return (
    <div>
      <Topbar mobileOpen={mobileOpen} />

      <LeftDrawer
        isMobile={mobileOpen}
        menus={SideBarMenu.menuForSuperAdmin}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
        translate={props.t}
        allowedMenus={allowedMenus}
      />
    </div>
  );
}

export default Admin;
