import React from "react";
import { Link, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  CryptoDetails,
  Homepage,
  CryptoCurrencies,
  News,
} from "./components/Index";
import "./index.css";
import './cpy.css'

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes> {/* Replaced Switch with Routes */}
              <Route path="/" element={<Homepage />} /> {/* Updated Route syntax */}
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/CryptoCurrencies" element={<CryptoCurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="bg-[#001529] flex flex-col items-center p-5 text-white">
        <Typography.Title level={5} className="text-center">
         <p className="text-white">Cryptoverse <br />
         All Rights Reserved</p> 
        </Typography.Title>
        <Space>
          <Link to="#">Link1</Link>
          <Link to="#">Link2</Link>
          <Link to="#">Link3</Link>
        </Space>
      </div>
      </div>
      
    </div>
    
  );
};

export default App;
