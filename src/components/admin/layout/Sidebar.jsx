import React, { useState } from 'react';
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { FaLayerGroup, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/store-logo.png";
const SidebarMenuItem = [
  {
    label: <Link to={"/admin/dashboard"}>{"Dashboard"}</Link>,
    icon: <DashboardOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: <Link to={"/admin/add-product"}>{"Add Product"}</Link>,
    icon: <ShoppingCartOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: <Link to={"/admin/add-category"}>{"Add Category"}</Link>,
    icon: <FaLayerGroup style={{ fontSize: "20px" }} />,
  },
  {
    label: <Link to={"/admin/all-category"}>{"All Category"}</Link>,
    icon: <UnorderedListOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: <Link to={"/admin/all-product"}>{"All Product"}</Link>,
    icon: <FaBoxOpen style={{ fontSize: "20px" }} />,
  },
  {
    label: <Link to={"/admin/all-order"}>{"All order"}</Link>,
    icon: <FileAddOutlined style={{ fontSize: "20px" }} />,
  },
];

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { Sider } = Layout;
  return (
    <div className={`mb-hide `}>
      <Sider
        style={{
          backgroundColor: "white",
          height: '100%',
          maxHeight:"100em"
        }}
        collapsed={isSidebarOpen}
        trigger={null}
        className={` ${isSidebarOpen ? 'py-24' : 'py-12'} shadow-2xl`}
      >
        {
          isSidebarOpen ? <>
          </> : <>
            <Button onClick={toggleSidebar} className='relative text-[22px] xl:left-[8rem] bottom-4 outline-none border-none shadow-none' >
              <iconify-icon icon="oui:menu-left"></iconify-icon>     </Button>
          </>
        }

        {
          isSidebarOpen ? (
            <>

            </>
          ) : (
            <>
              <div>
                <Link to={"/admin/dashboard"}>
                  <img
                    src={Logo}
                    alt="No"
                    className="w-[130px] mx-8 object-cover mb-2 "
                  />
                </Link>
              </div>
            </>
          )
        }

        <div className="flex justify-center items-center flex-col mt-4">
          <Menu
            className="capitalize outline-none border-none shadow-none"
            style={{ borderInlineEnd: 0, backgroundColor: "transparent" }}
            items={SidebarMenuItem}
            mode='inline'
          />
        </div>
      </Sider>
    </div>
  );
}

export default Sidebar;
