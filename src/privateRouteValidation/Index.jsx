import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import usePrivateRouteAccess from "./hooks/usePrivateRouteAccess";
import LoadingBackdrop from "./components/LoadingBackdrop";

const PrivateRouteValidation = () => {
  const { haveAccess, loaded } = usePrivateRouteAccess();

  if (!loaded) return <LoadingBackdrop />;
  if (!haveAccess) return <LoadingBackdrop accessDenied />;

  return <Outlet />;
};

export default PrivateRouteValidation;
