import React from "react";

function Admin() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <TopBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
    </div>
  );
}

export default Admin;
