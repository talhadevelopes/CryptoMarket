import React from "react";
import { Avatar, Typography, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FunctionOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-[13%] bg-[#001529]">
      <div className="flex flex-col w-full p-5">
        <div className="bg-[#001529] flex items-center p-5 w-full">
          <Avatar
            src="https://plus.unsplash.com/premium_photo-1734514490566-b84341774897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            size="large"
          />
          <Typography.Title level={2} className="ml-3 text-white text-xs">
            <Link to="/"><p className="absolute text-xl -mt-2">CryptoMarket</p></Link>
          </Typography.Title>
        </div>
        
        <Menu theme="dark" className="flex-1 mt-8">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FunctionOutlined />}>
            <Link to="/cryptocurrencies">Crypto Currencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
