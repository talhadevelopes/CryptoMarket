import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import EnvironmentDebug from "./components/EnvironmentDebug";
import {
  Navbar,
  Exchanges,
  CryptoDetails,
  Homepage,
  CryptoCurrencies,
  News,
} from "./components/Index";
import "./index.css";
import "./cpy.css";

const App = () => {
  const [activeMenu, setActiveMenu] = useState(true); // For large screens
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically hide sidebar on small screens
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false); // Hide sidebar on small screens
    } else {
      setActiveMenu(true); // Show sidebar on large screens
    }
  }, [screenSize]);

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        screenSize={screenSize}
      />

      {/* Main Body */}
      <EnvironmentDebug />
      <div
        style={{
          marginLeft: activeMenu && screenSize >= 768 ? "260px" : "20px", // Directly apply margin
          transition: "margin-left 0.3s", // Smooth transition
        }}
        className="flex-[0.99] mt-[20px] relative"
      >
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="bg-[#001529] flex flex-col items-center p-5 text-white">
          <Typography.Title level={5} className="text-center">
            <p className="text-white">
              Cryptoverse <br />
              All Rights Reserved
            </p>
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;