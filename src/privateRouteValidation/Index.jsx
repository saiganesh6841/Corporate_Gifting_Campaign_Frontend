import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import usePrivateRouteAccess from "./hooks/usePrivateRouteAccess";
import LoadingBackdrop from "./components/LoadingBackdrop";

const PrivateRouteValidation = ({ children }) => {
  const { haveAccess, loaded } = usePrivateRouteAccess();

  console.log(haveAccess, loaded, "minhal erripuka");
  // alert("hiii");

  if (!loaded) return <LoadingBackdrop />;
  if (!haveAccess) return <LoadingBackdrop accessDenied />;
  {
    // /* <Outlet /> */
  }
  return children;
};

export default PrivateRouteValidation;
