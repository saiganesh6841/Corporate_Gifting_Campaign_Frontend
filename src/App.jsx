import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import AdminIndex from "./privateRouteValidation/Index";
import PrivateRouteValidation from "./privateRouteValidation";
// import PrivateRouteValidation from "./PrivateRouteValidation";
import Public from "./pages/public/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Public />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRouteValidation>
              {/* <AdminIndex /> */}
            </PrivateRouteValidation>
          }
        />
      </Routes>
    </>
  );
}

export default App;
