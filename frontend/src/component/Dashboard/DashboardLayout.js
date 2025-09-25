import React from "react";
import DashboardNav from "./DashboardNav";
import Sidebar from "./SideBar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <DashboardNav />
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 py-5">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
