import LocalStorage from "../../config/LocalStorage";

export const checkUserPermissions = (user, currentPath) => {
  const permissions = user.permission?.permission || [];

  const maintenanceOptions = permissions
    .filter((perm) => perm.enable)
    .map((perm) => perm.label);

  maintenanceOptions.push("settings");
  LocalStorage.maintenanceOptions = maintenanceOptions;

  let accessFlag = false;
  let redirectUrl = currentPath;

  for (const [key, value] of Object.entries(
    LocalStorage.adminSideMenuWithRoleID
  )) {
    if (value === currentPath) {
      if (!key || maintenanceOptions.includes(key)) {
        accessFlag = true;
        break;
      }
    }
  }

  if (!accessFlag) {
    for (const [key, value] of Object.entries(
      LocalStorage.adminSideMenuWithRoleID
    )) {
      if (value !== currentPath) {
        redirectUrl = value;
        break;
      }
    }
    return { accessGranted: false, redirectUrl };
  }

  permissions.forEach((perm) => {
    if (perm.enable) {
      Object.keys(LocalStorage.adminSideMenuWithRoleID).forEach((key) => {
        if (
          LocalStorage.adminSideMenuWithRoleID[key] === currentPath &&
          key === perm.label
        ) {
          const buttonDetails = perm.buttons
            .filter((btn) => btn.enable)
            .map((btn) => ({ button: btn.label, disable: false }));
          LocalStorage.adminButtonPermission = buttonDetails;
        }
      });
    }
  });

  return { accessGranted: true };
};

export const handleLogout = () => {
  LocalStorage.userName = "";
  LocalStorage.userEmail = "";
  LocalStorage.userMobile = "";
  LocalStorage.userType = "";
  LocalStorage.userProfileImage = "";
};


