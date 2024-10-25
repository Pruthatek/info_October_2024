import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const HomeOutlet = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default HomeOutlet;
