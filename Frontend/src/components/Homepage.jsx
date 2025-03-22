import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../redux/services/cryptoAPI";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import {
  MoneyCollectOutlined, // Icon for Market Cap
  DollarCircleOutlined, // Icon for 24h Volume
  FundOutlined, // Icon for Crypto Currencies
  BankOutlined, // Icon for Exchanges
  ShoppingOutlined,
  GoldFilled, // Icon for Markets
} from "@ant-design/icons";


const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10); // Pass 10 to get top 10

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>; // Improved error message

  // Extract global statistics from the API response
  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={[16, 16]}>
      <Col span={12}>
        <Statistic
        className="bg-white w-[70%] p-4 rounded-lg shadow-md"
          title={
            <span>
              <FundOutlined style={{ marginRight: 8, color: "#1890ff", fontSize: "large"  }} />
              Total Crypto Currencies
            </span>
          }
          value={globalStats?.total || "N/A"}
        />
      </Col>
      <Col span={12}>
        <Statistic
        className="bg-white w-[70%] p-4 rounded-lg shadow-md"
          title={
            <span>
              <BankOutlined style={{ marginRight: 8, color: "#52c41a", fontSize: "large"  }} />
              Total Exchanges
            </span>
          }
          value={millify(globalStats?.totalExchanges || 0)}
        />
      </Col>
      <Col span={12}>
        <Statistic
        className="bg-white w-[70%] p-4 rounded-lg shadow-md"
          title={
            <span>
              <MoneyCollectOutlined style={{ marginRight: 8, color: "#faad14", fontSize: "large"  }} />
              Total Market Cap
            </span>
          }
          value={millify(globalStats?.totalMarketCap || 0)}
        />
      </Col>
      <Col span={12}>
        <Statistic
        className="bg-white w-[70%] p-4 rounded-lg shadow-md"
          title={
            <span>
              <DollarCircleOutlined style={{ marginRight: 8, fontSize: "large" ,color: "#13c2c2" }} />
              Total 24h Volume
            </span>
          }
          value={millify(globalStats?.total24hVolume || 0)}
        />
      </Col>
      <Col span={12}>
        <Statistic
        className="bg-white w-[70%] p-4 rounded-lg shadow-md"
          title={
            <span>
              <ShoppingOutlined style={{ marginRight: 8, color: "#722ed1", fontSize: "large" }} />
              Total Markets
            </span>
          }
          value={millify(globalStats?.totalMarkets || 0)}
        />
      </Col>
    </Row>
  
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className="show-more"><Link to='/CryptoCurrencies'>Show More</Link></Title>
      </div>
      <CryptoCurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified={true} /> {/* Make sure News component is handling simplified prop */}
    </>
  );
};

export default Homepage;
