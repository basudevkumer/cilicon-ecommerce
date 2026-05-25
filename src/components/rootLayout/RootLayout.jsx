import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/commonComponent/footers/Footer";
import NavWidget from "@/components/home/header/navigation/navWidgate";
import NavTop from "@/components/home/header/navigation/topNav/Index";
import NavMiddle from "@/components/home/header/navigation/navMiddle/Index";
import NavBottom from "@/components/home/header/navigation/navBottom/Index";

const RootLayout = () => {
  return (
    <div>
      <div>
        <NavWidget />
        <NavTop />
        <NavMiddle />
        <NavBottom />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
