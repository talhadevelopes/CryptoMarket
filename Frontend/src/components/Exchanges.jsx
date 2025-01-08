import React from "react";
import { useGetExchangesQuery } from "../redux/services/cryptoAPI";
import { Row, Col, Typography, Collapse } from "antd";
import Loader from "./Loader";
import millify from "millify";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();

  if (isFetching) return <Loader />;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const exchangeList = data?.Data ? Object.values(data.Data) : [];

  return (
    <>
      <Row>
        <Col span={4}>
          <strong className="text-2xl text-blue-500">Index</strong>
        </Col>{" "}
        {/* Serial Number Column */}
        <Col span={5}>
          <strong className="text-2xl text-blue-500">Exchange</strong>
        </Col>
        <Col span={5}>
          <strong className="text-2xl text-blue-500">24h Trade Volume</strong>
        </Col>
        <Col span={5}>
          <strong className="text-2xl text-blue-500">Country</strong>
        </Col>
        <Col span={5}>
          <strong className="text-2xl text-blue-500">Rating</strong>
        </Col>
      </Row>
      <Row>
        {exchangeList.map((exchange, index) => (
          <Col span={24} key={exchange.Id}>
            <Collapse>
              <Panel
                key={exchange.Id}
                showArrow={false}
                header={
                  <Row key={exchange.Id}>
                    <Col span={4}>
                      <Text>
                        <strong>{index + 1}</strong>
                      </Text>{" "}
                      {/* Serial number */}
                    </Col>
                    <Col span={5}>
                      <Text>
                        <strong>{exchange.Name}</strong>
                      </Text>
                    </Col>
                    <Col span={5}>
                      ${millify(exchange.TOTALVOLUME24H?.BTC || 0)}
                    </Col>
                    <Col span={5}>{exchange.Country || "N/A"}</Col>
                    <Col span={5}>{exchange.Rating?.Avg || "N/A"}</Col>
                  </Row>
                }
              >
                <Text>
                  {exchange.Description || "No description available."}
                </Text>
                <br />
                <Text>
                  Website:{" "}
                  <a
                    href={exchange.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exchange.Url}
                  </a>
                </Text>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
