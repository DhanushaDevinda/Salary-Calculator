import React from "react";
import { Outlet } from "react-router-dom";
import "../css/style.css";
const Layout = () => {
  return (
    <>
      <div className="mt-132"></div>
      <Outlet />
      <div className="mb-132"></div>
    </>
  );
};

export default Layout;
