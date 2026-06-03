import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { MyContext } from "../App";

const DashboardLayout = () => {
  const context = useContext(MyContext);

  return (
    <section className="main">
      <Header />

      <div className="contentMain flex">
        {/* SIDEBAR */}
        <div
          className={`overflow-hidden sidebarWrapper ${
            context?.isSidebarOpen === true
              ? context?.windowWidth < 992
                ? `w-[${context?.sidebarWidth / 1.5}%]`
                : `w-[20%]`
              : "w-[0px] opacity-0 invisible"
          } transition-all`}
        >
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}
        <div
          className={`contentRight overflow-hidden py-4 px-5 ${
            context?.isSidebarOpen === true &&
            context?.windowWidth < 992 &&
            "opacity-0"
          } transition-all`}
          style={{
            width: context?.isSidebarOpen === false ? "100%" : "80%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
