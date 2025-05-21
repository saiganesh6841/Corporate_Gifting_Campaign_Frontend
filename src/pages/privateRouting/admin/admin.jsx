import React from "react";
import Topbar from "./topbar";

function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <Topbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
    </div>
  );
}

export default Admin;
