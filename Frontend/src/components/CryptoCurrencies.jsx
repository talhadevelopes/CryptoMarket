import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { useGetCryptosQuery } from "../redux/services/cryptoAPI";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptoList?.data?.coins) {
      const filteredData = cryptoList.data.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptoList, searchTerm]);

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto" style={{ display: "flex", alignItems: "center" }}>
  <input
    className="px-20 py-2 border border-gray-300 rounded-tl-lg rounded-bl-lg text-xl flex-1"
    type="text"
    placeholder="Search Cryptocurrency"
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    className="ml-0 px-6 py-4 rounded-r rounded-b mr-4 bg-blue-500 text-white  hover:bg-blue-600"
  >
    Click
  </button>
</div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
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

