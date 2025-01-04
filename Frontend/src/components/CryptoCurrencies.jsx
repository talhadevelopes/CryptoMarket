import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { useGetCryptosQuery } from "../redux/services/cryptoAPI";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100; // Conditionally fetch 10 or 100 cryptos
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count); // Pass count to query
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // When cryptoList or searchTerm changes, update cryptos state
    if (cryptoList?.data?.coins) {
      const filteredData = cryptoList.data.coins.filter(
        (coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case insensitive search
      );
      setCryptos(filteredData);
    }
  }, [cryptoList, searchTerm]); // Dependencies include both cryptoList and searchTerm

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
