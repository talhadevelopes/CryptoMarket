import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Loader from "./Loader";
import LineChart from "./LineChart";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../redux/services/cryptoAPI";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  
  if (isFetching) return <Loader />;

  if (!cryptoDetails?.data?.coin) {
    return <div>Error: Unable to fetch cryptocurrency details</div>;
  }

  const coin = cryptoDetails.data.coin;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    { title: "Price to USD", value: `$ ${millify(coin.price)}`, icon: <DollarCircleOutlined /> },
    { title: "Rank", value: coin.rank, icon: <NumberOutlined /> },
    { title: "24h Volume", value: `$ ${millify(coin["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: "Market Cap", value: `$ ${millify(coin.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: "All-time-high (daily avg.)", value: `$ ${millify(coin.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: "Number Of Markets", value: coin.numberOfMarkets, icon: <FundOutlined /> },
    { title: "Number Of Exchanges", value: coin.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: "Approved Supply", value: coin.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: "Total Supply", value: `$ ${millify(coin.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: "Circulating Supply", value: `$ ${millify(coin.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coin.name} ({coin.symbol}) Price
        </Title>
        <p>{coin.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(coin.price)} coinName={coin.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{coin.name} Value Statistics</Title>
            <p>An overview showing the statistics of {coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {coin.name}, such as the number of markets, exchanges, and supply information.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {coin.name}?</Title>
          {coin.description && HTMLReactParser(coin.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{coin.name} Links</Title>
          {coin.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;

