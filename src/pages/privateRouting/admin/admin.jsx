import React from "react";
import Topbar from "./topbar";
import LeftDrawer from "./leftDrawer/Index";
import SideBarMenu from "../../../config/SideBarMenu";

function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <Topbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

      <LeftDrawer
        isMobile={props.mobileOpen}
        menus={SideBarMenu.menuForSuperAdmin}
        translate={props.t}
        allowedMenus={allowedMenus}
      />
    </div>
  );
}

export default Admin;
