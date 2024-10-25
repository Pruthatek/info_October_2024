import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AdminOutlet = () => {
  return (
    <>
      <Sidebar />
      <main className="ml-72 py-10">
        <Outlet />
      </main>
    </>
  );
};

export default AdminOutlet;
