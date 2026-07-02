import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRouteValidation from "./PrivateRouteValidation";
import Public from "./pages/public/index";
import AdminIndex from "./pages/privateRouting/admin";
import EmployeeGiftApp from "./pages/EmployeePage/Index";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/gift/:token" element={<EmployeeGiftApp />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRouteValidation>
              <AdminIndex />
            </PrivateRouteValidation>
          }
        />
        <Route path="/*" element={<Public />} />
      </Routes>
    </>
  );
}

export default App;
