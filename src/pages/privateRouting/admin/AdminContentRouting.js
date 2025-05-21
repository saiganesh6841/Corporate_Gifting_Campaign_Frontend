import { Stack } from "@fluentui/react";
import { CircularProgress } from "@mui/material";
import React, { Suspense, useLayoutEffect } from "react";
import { withTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router-dom";
import useServices from "./hook/userServices";
import WithSuspense from "../../../components/Suspense/Index";

const Users = React.lazy(() => import("./Users"));
const Role = React.lazy(() => import("./Roles/index"));
// const Settings = React.lazy(() => import("./Settings"));
const Dashboard = React.lazy(() => import("./Dashboard"));

// const taskManagement = React.lazy(() => import("./task-management")); will add in last
function AdminContentRouting(props) {
  const services = useServices();

  useLayoutEffect(() => {
    // Fetch data when the component mounts
    // services.getConstants();
  }, []);

  return (
    <Switch>
      <Route
        exact
        path={["/admin"]}
        render={() => <Redirect to="/admin/users" />}
      />
      <Route exact path={["/admin/users"]} component={WithSuspense(Users)} />
      <Route
        exact
        path={["/admin/dashboard"]}
        component={WithSuspense(Dashboard)}
      />

      <Route
        exact
        path={["/admin/security"]}
        render={() => <Redirect to="/admin/security/role" />}
      />

      <Route
        exact
        path={["/admin/security/role"]}
        component={WithSuspense(Role)}
      />

      {/* <Route
        exact
        path={["/admin/settings"]}
        component={WithSuspense(Settings)}
      /> */}

      {/* //will addin last for lazy loading<Route exact path={["/admin/setting"]} component={Settings} />
      <Route exact path={["/admin/enquiry"]} component={Enquiry} /> */}
      <Route render={() => <h3>Coming soon.</h3>} />
    </Switch>
  );
}
export default withTranslation("translations")(AdminContentRouting);
