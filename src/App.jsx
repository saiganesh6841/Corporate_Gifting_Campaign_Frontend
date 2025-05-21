import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRouteValidation from "./PrivateRouteValidation";
import Public from "./pages/public/index";
import AdminIndex from "./pages/privateRouting/admin";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/*" element={<Public />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRouteValidation>
              <AdminIndex />
            </PrivateRouteValidation>
          }
        />
      </Routes>
    </>
  );
}

export default App;
