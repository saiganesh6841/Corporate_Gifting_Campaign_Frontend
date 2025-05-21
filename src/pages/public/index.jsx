import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
// import SetPassword from "./setPassword";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default Index;
