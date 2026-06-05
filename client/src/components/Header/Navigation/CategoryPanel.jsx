import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { CategoryCollapse } from "../../CategoryCollapse";
import { Button } from "@mui/material";
import { MyContext } from "../../../App";
import { Link } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";

const CategoryPanel = (props) => {
  const context = useContext(MyContext);

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen);
  };
  const handleLogout = () => {
    props.setIsOpenCatPanel(false);
    props.propsSetIsOpenCatPanel(false);

    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true },
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        context.setUserData(null);
        context?.setCartData([]);
        context?.setMyListData([]);
        window.location.href = "/";
      }
    });
  };
  const DrawerList = (
    <Box
      sx={{ width: 320 }}
      role="presentation"
      className="categoryPanel h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-8 pb-6 border-b">
        <img
          src={localStorage.getItem("logo")}
          className="w-[180px] object-contain"
        />
      </div>

      <div className="absolute top-6 right-6">
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[32px] text-black"
        />
      </div>

      {props?.data?.length !== 0 && (
        <CategoryCollapse
          data={props?.data}
          closePanel={() => {
            props.setIsOpenCatPanel(false);
            props.propsSetIsOpenCatPanel(false);
          }}
        />
      )}

      <div className="mt-auto p-5 border-t bg-white">
        {!context?.isLogin ? (
          <Link to="/login">
            <Button className="!bg-[#D7372F] !text-white !w-full !h-[40px] !rounded-lg">
              LOG IN
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleLogout}
            className="!bg-[#D7372F] !text-white !w-full !h-[40px] !rounded-lg"
          >
            LOGOUT
          </Button>
        )}
      </div>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={props.isOpenCatPanel}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "360px",
            backgroundColor: "#fff",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
