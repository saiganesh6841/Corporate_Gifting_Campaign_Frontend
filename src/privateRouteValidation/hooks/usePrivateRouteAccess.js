import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import LocalStorage from "../../config/LocalStorage";
import APIRequest from "../../utils/APIRequest";
import { adminPublicRoutes } from "../../constant/Index";
import { handleLogout } from "../utils/util";

const usePrivateRouteAccess = () => {
  const [haveAccess, setHaveAccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!LocalStorage?.userDetails?.permission?.permission) {
      checkAccess(); // Fetches & stores permissions
    } else {
      validateFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const checkAccess = async () => {
    LocalStorage.adminButtonPermission = [];

    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.isLogin,
        ""
      );

      if (response.code === 100 && response.data?.responseCode === 109) {
        const user = response.data.user;
        if (user) {
          LocalStorage.userDetails = {
            email: user?.email,
            mobileNo: user?.mobileNo,
            name: user?.fullName,
            permission: user?.permission,
            profileImage: user?.profileImage,
            userName: user?.userName,
            userType: user?.userType,
            isSuperAdmin: user?.isSuperAdmin,
            userId: user?._id,
          };
        }
        validateFromLocalStorage();
      } else {
        setLoaded(true);
        clearUserStorageAndRedirect();
      }
    } catch {
      navigate("/", { replace: true });
    }
  };

  const validateFromLocalStorage = () => {
    const currentPath = location.pathname;

    if (!currentPath.startsWith("/admin")) {
      navigate("/login", { replace: true });
      return;
    }

    const permissions = LocalStorage?.userDetails?.permission?.permission || [];
    const adminMenu = LocalStorage.adminSideMenuWithRoleID || {};
    const maintenanceOptions = permissions
      .filter((p) => p.enable)
      .map((p) => p.label);

    LocalStorage.maintenanceOptions = [
      ...maintenanceOptions,
      ...adminPublicRoutes,
    ];

    const canAccess = Object.entries(adminMenu).some(
      ([label, path]) =>
        path === currentPath && LocalStorage.maintenanceOptions.includes(label)
    );

    if (canAccess) {
      setAdminButtonPermissions(currentPath);
      setHaveAccess(true);
    } else {
      const allowedEntry = Object.entries(adminMenu).find(([label]) =>
        LocalStorage.maintenanceOptions.includes(label)
      );

      if (allowedEntry) {
        const [, fallbackPath] = allowedEntry;
        setHaveAccess(true);
        navigate(fallbackPath, { replace: true });
      } else {
        clearUserStorageAndRedirect();
      }
    }

    setLoaded(true);
  };

  const setAdminButtonPermissions = (path) => {
    const permissions = LocalStorage.userDetails.permission.permission;
    const buttons = permissions
      .filter(
        (perm) =>
          perm.enable &&
          LocalStorage.adminSideMenuWithRoleID[perm.label] === path
      )
      .flatMap((perm) =>
        perm.buttons
          .filter((btn) => btn.enable)
          .map((btn) => ({ button: btn.label, disable: false }))
      );

    LocalStorage.adminButtonPermission = buttons;
  };

  const clearUserStorageAndRedirect = () => {
    handleLogout();
    navigate("/login", { replace: true });
  };

  return { haveAccess, loaded };
};

export default usePrivateRouteAccess;
