import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login/index";
// import SetPassword from "./setPassword";

const Index = () => {
  // alert("hii");
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/forget-password" element={<SetPassword />} /> */}
    </Routes>
  );
};

export default Index;
