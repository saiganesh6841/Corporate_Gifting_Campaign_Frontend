import { Stack } from "@fluentui/react";
import { CircularProgress } from "@mui/material";
import React, { useLayoutEffect, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WithSuspense from "../../../components/withSuspense";
import Dashboard from "./Dashboard/Index";
// import useServices from "./hook/userServices";
// import WithSuspense from "../../../components/Suspense/Index";

// Lazy-loaded components
const Users = React.lazy(() => import("./Users"));
const Role = React.lazy(() => import("./Roles/index"));
// const Settings = React.lazy(() => import("./Settings"));
// const taskManagement = React.lazy(() => import("./task-management")); // Will add later
const Organizations = React.lazy(() => import("./Organizations/index"));
const Campaigns = React.lazy(() => import("./Campaigns/index"));
const Products = React.lazy(() => import("./Products/index"));
const Employees = React.lazy(() => import("./Employees/index"));
const Orders = React.lazy(() => import("./Orders/index"));
function AdminContentRouting() {
  // const services = useServices();

  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="users" element={<Users />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="security/role" element={<Role />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="products" element={<Products />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/orders" element={<Orders />} />

        {/* <Route path="attendance" element={<Attendance />} /> */}

        {/* Fallback route */}
        <Route path="*" element={<h3>Coming soon.</h3>} />
      </Routes>
    </Suspense>
  );
}

export default AdminContentRouting;
