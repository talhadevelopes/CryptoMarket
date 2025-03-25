import React, { useState } from "react";
import { Card, Typography, Row, Col, Button, Input } from "antd";
import { useGetCryptosNewsQuery } from "../redux/services/cryptoNewsAPI";
import moment from "moment";

const { Title, Text } = Typography;
const { Search } = Input;

const News = ({ simplified }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: cryptoNews, error, isFetching } = useGetCryptosNewsQuery({
    newsCategory: "cryptocurrency", // Changed to lowercase to match GNews query
    count: simplified ? 6 : 30,
  });

  if (isFetching) return <div>Loading...</div>;

  if (error) {
    console.error("API call failed:", error);
    return <div>Failed to fetch news</div>;
  }

  if (!cryptoNews?.articles || cryptoNews.articles.length === 0) {
    console.log("No articles available:", cryptoNews);
    return <div>No News Available</div>;
  }

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  const filteredNews = cryptoNews.articles.filter((news) =>
    news.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    (news.description && news.description.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <div>
      {/* Search Bar */}
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Search
            placeholder="Search News..."
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchKeyword(value)}
            style={{ width: "100%", maxWidth: "600px" }}
          />
        </Col>
      </Row>

      {/* Display Filtered News */}
      <Row gutter={[24, 24]}>
        {filteredNews.length > 0 ? (
          filteredNews.map((news, i) => (
            <Col xs={24} lg={8} key={i}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: "100%" }}
                >
                  {/* First Row: Title, Description, and Image */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Left Side: Title and Description */}
                    <div
                      style={{
                        flex: 1,
                        paddingRight: "10px",
                      }}
                    >
                      <Title
                        level={4}
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        {news.title}
                      </Title>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          textAlign: "left",
                        }}
                      >
                        {news.description
                          ? news.description
                          : "No description available."}
                      </Text>
                    </div>

                    {/* Right Side: Image */}
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                      }}
                    >
                      <img
                        src={news.image || demoImage} // Changed from urlToImage to image
                        alt={news.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Second Row: Full Width Description and Button */}
                  <div
                    style={{
                      marginTop: "20px",
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        textAlign: "left",
                      }}
                    >
                      {news.content
                        ? news.content.substring(0, 150) + "..."
                        : "No content available."}
                    </Text>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {news.source?.name || "Unknown source"}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {moment(news.publishedAt).fromNow()}
                      </Text>
                    </div>

                    <Button
                      type="primary"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                        padding: "8px 20px",
                        fontSize: "14px",
                        width: "100%",
                      }}
                    >
                      Read More
                    </Button>
                  </div>
                </a>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div>No news articles found for the search term.</div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default News;