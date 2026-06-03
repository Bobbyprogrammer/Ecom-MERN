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

      {context?.windowWidth < 992 && context?.isLogin === false && (
        <div className="mt-auto p-5 border-t bg-white">
          <Link
            to="/login"
            onClick={() => {
              props.setIsOpenCatPanel(false);
              props.propsSetIsOpenCatPanel(false);
            }}
          >
            <Button
              className="
        !bg-[#D7372F]
        hover:!bg-[#c52d26]
        !text-white
        !font-[700]
        !rounded-lg
        !py-4
        !w-full
        !text-[18px]
      "
            >
              LOG IN
            </Button>
          </Link>
        </div>
      )}

      {context?.windowWidth < 992 && context?.isLogin === true && (
        <div
          className="p-3 block"
          onClick={() => {
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
                history("/");
              }
            });
          }}
        >
          <Button className="btn-org w-full">Logout</Button>
        </div>
      )}
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
