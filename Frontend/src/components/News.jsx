import React, { useState } from "react";
import { useGetCryptosNewsQuery } from "../redux/services/cryptoNewsAPI";
import moment from "moment";

const News = ({ simplified }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: cryptoNews, error, isFetching } = useGetCryptosNewsQuery({
    newsCategory: "cryptocurrency",
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
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search News..."
          className="w-full max-w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Display Filtered News */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((news, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <a href={news.url} target="_blank" rel="noreferrer">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {news.title}
                </h3>

                {/* Image */}
                <img
                  src={news.image || demoImage}
                  alt={news.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {news.description || "No description available."}
                </p>

                {/* Source and Time */}
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>{news.source?.name || "Unknown source"}</span>
                  <span>{moment(news.publishedAt).fromNow()}</span>
                </div>

                {/* Read More Button */}
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  Read More
                </button>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No news articles found for the search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
