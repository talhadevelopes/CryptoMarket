import React from "react";
import { Avatar, Typography, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FunctionOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

const Navbar = ({ activeMenu, setActiveMenu, screenSize }) => {
  // Define the menu items in an array
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: "home", icon: <HomeOutlined /> },
    {
      label: <Link to="/cryptocurrencies">Crypto Currencies</Link>,
      key: "cryptocurrencies",
      icon: <FunctionOutlined />,
    },
    {
      label: <Link to="/exchanges">Exchanges</Link>,
      key: "exchanges",
      icon: <MoneyCollectOutlined />,
    },
    {
      label: <Link to="/news">News</Link>,
      key: "news",
      icon: <BulbOutlined />,
    },
  ];

  // Sidebar width logic
  const sidebarWidth = screenSize < 768 ? (activeMenu ? "w-full" : "w-0") : "w-[12%]";

  return (
    <>
      {/* Toggle Button (Always Visible) */}
      <Button
        onClick={() => setActiveMenu(!activeMenu)}
        className="fixed z-50 top-5 left-4 bg-[#001529] text-white rounded-full p-2 border-none shadow-lg"
        icon={activeMenu ? <LeftOutlined /> : <RightOutlined />}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 flex h-screen bg-[#001529] ${sidebarWidth} transition-all duration-300 overflow-hidden`}
      >
        <div className="flex flex-col w-full p-5">
          {/* Sidebar Content */}
          <div className="flex items-center mt-12">
            <Avatar
              src="https://plus.unsplash.com/premium_photo-1734514490566-b84341774897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              size="large"
            />
            {activeMenu && (
              <Typography.Title level={2} className="ml-3 text-white text-xs">
                <Link to="/">CryptoMarket</Link>
              </Typography.Title>
            )}
          </div>
          <Menu theme="dark" className="mt-8 text-xl" items={menuItems} />
        </div>
      </div>
    </>
  );
};

export default Navbar;