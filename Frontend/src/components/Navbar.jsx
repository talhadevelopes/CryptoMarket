import React, { useState, useEffect } from "react";
import { Avatar, Typography, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FunctionOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined, // Hamburger icon
  CloseOutlined, // Close icon
} from "@ant-design/icons";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true); // For large screens
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile toggle

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false); // Hide sidebar on small screens
    } else {
      setActiveMenu(true); // Show sidebar on large screens
    }
  }, [screenSize]);

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

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`fixed top-0 left-0 flex h-screen bg-[#001529] ${
          activeMenu ? "w-1/5" : "w-0"
        } transition-all duration-300`}
      >
        <div className="flex flex-col w-full p-5">
          <div className="flex items-center">
            <Avatar
              src="https://plus.unsplash.com/premium_photo-1734514490566-b84341774897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              size="large"
            />
            <Typography.Title level={2} className="ml-3 text-white text-xs">
              <Link to="/"></Link>
            </Typography.Title>
          </div>
          <Menu theme="dark" className="flex-1 mt-8" items={menuItems} />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="w-full fixed top-0 left-0 bg-[#001529] p-5 flex items-center justify-between z-10 sm:hidden">
        <Avatar
          src="https://plus.unsplash.com/premium_photo-1734514490566-b84341774897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          size="large"
        />
        <Typography.Title level={2} className="ml-3 text-white text-xs">
          <Link to="/">CryptoMarket</Link>
        </Typography.Title>
        {/* Toggle Button */}
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
          icon={
            isMobileMenuOpen ? (
              <CloseOutlined className="transition-all duration-300 transform rotate-90" />
            ) : (
              <MenuOutlined className="transition-all duration-300" />
            )
          }
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full bg-[#001529] p-5 sm:hidden">
          <Menu
            theme="dark"
            mode="vertical"
            className="mt-8"
            items={menuItems}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
