import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col, Button, Avatar, Input } from "antd"; // Added Input import
import { useGetCryptosNewsQuery } from "../redux/services/cryptoNewsAPI";
import moment from "moment"; // For date formatting
import { UserOutlined } from "@ant-design/icons"; // For default user icon

const { Title, Text } = Typography;
const { Search } = Input; // Destructure Search from Input for easy usage

const News = ({ simplified }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // Fetching the news related to the selected crypto
  const { data: cryptoNews, error, isFetching } = useGetCryptosNewsQuery({
    newsCategory: "CryptoCurrency", // Fixed category since search is keyword-based
    count: simplified ? 6 : 30, 
  });

  if (isFetching) return <div>Loading...</div>; // Show loading state while fetching data

  if (error) {
    console.error("API call failed:", error);
    return <div>Failed to fetch news</div>;
  }

  // Check if data exists and handle empty response gracefully
  if (!cryptoNews?.articles || cryptoNews.articles.length === 0) {
    console.log("No articles available:", cryptoNews);
    return <div>No News Available</div>;
  }

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  // Filter the articles based on the searchKeyword
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "100%",
                    }}
                  >
                    {/* Title and description section */}
                    <div
                      style={{
                        flex: 1,
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column", // Ensure the title, description, and avatar stack vertically
                      }}
                    >
                      <Title
                        level={4}
                        style={{
                          marginTop: "10px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          textAlign: "left", // Left-aligned text for title
                        }}
                      >
                        {news.title}
                      </Title>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          marginBottom: "15px",
                          textAlign: "left",
                          padding: "0",
                        }}
                      >
                        {news.description
                          ? news.description
                          : "No description available."}
                      </Text>
                      <Button
                        type="primary"
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#1890ff",
                          borderColor: "#1890ff",
                          padding: "8px 20px",
                          fontSize: "14px",
                        }}
                        onClick={() => window.open(news.url, "_blank")}
                      >
                        Read More
                      </Button>

                      {/* Avatar and Date section */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        {/* Check if provider exists and has the right structure */}
                        {news.provider && news.provider.length > 0 ? (
                          <>
                            <Avatar
                              src={
                                news.provider[0]?.image?.thumbnail?.contentUrl ||
                                demoImage
                              }
                              alt={news.provider[0]?.name || "Provider"}
                              style={{ marginRight: "10px" }}
                            />
                            <Text style={{ fontSize: "12px", color: "#888" }}>
                              {news.provider[0]?.name || "No provider name"}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Avatar
                              icon={<UserOutlined />} // Default user icon if no provider
                              style={{ marginRight: "10px" }}
                            />
                            <Text style={{ fontSize: "12px", color: "#888" }}>
                              No provider available
                            </Text>
                          </>
                        )}
                        <Text
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginLeft: "10px",
                          }}
                        >
                          {moment(news.publishedAt).fromNow()}
                        </Text>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        marginLeft: "10px",
                      }}
                    >
                      <img
                        src={news.urlToImage || demoImage} // Fallback image if no image is available
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
