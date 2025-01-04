import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../redux/services/cryptoAPI";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";

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
      <Row>
        <Col span={12}>
          <Statistic title="Total Crypto Currencies" value={globalStats?.total || "N/A"} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats?.totalMarkets || 0)} />
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
