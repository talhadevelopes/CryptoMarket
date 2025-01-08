# Crypto Market Website

A comprehensive cryptocurrency market data platform that provides real-time information about cryptocurrencies, including market statistics, detailed coin analysis, and cryptocurrency news. The platform leverages multiple APIs to deliver accurate and up-to-date information about the crypto market.

## Features

### Global Crypto Statistics
- Total Cryptocurrencies Overview
- Exchange Statistics
- Total Market Capitalization
- 24-hour Trading Volume
- Comprehensive Market Metrics

### Detailed Cryptocurrency Information
- Individual Coin Statistics
- Price Information in USD
- Market Rankings
- Trading Volume Analysis
- Market Capitalization Data
- All-time High Records
- Supply Information
  - Total Supply
  - Circulating Supply
  - Maximum Supply (where applicable)

### Exchange Information
- Exchange Rankings
- 24-hour Trading Volumes
- Geographic Location Data
- Exchange Ratings
- Detailed Platform Descriptions

### Technical Features
- Interactive Charts and Graphs
- Real-time Data Updates
- Responsive Design
- Search Functionality
- Filtering Capabilities
- Sorting Options

## Technologies Used

### Frontend Framework and Libraries
- React.js
- React Router DOM (for navigation)
- Redux Toolkit (state management)
- React Redux (React bindings for Redux)

### UI Components and Styling
- Ant Design (antd)
- Ant Design Icons
- Lucide React (icons)
- React Icons (additional icon sets)

### Data Visualization
- Chart.js (v4.4.7)
- React Chart.js 2 (v5.3.0)

### Data Processing and Utilities
- Axios (HTTP client)
- HTML React Parser
- Millify (number formatting)
- Moment.js (date handling)

### Environment Configuration
- dotenv (environment variables)

## APIs Integrated

### CoinRanking API
- Primary source for cryptocurrency data
- Market statistics
- Individual coin information
- Historical price data

### NewsAPI
- Cryptocurrency news articles
- Market updates
- Industry developments

### CryptoCompare API
- Exchange data
- Trading pair information
- Market depth data

## Installation

```bash
npm install antd @ant-design/icons react-redux @reduxjs/toolkit lucide-react react-icons axios chart.js html-react-parser millify moment chart.js@4.4.7 react-chartjs-2@5.3.0 react-router react-router-dom dotenv
````

## Environment Setup

Create a `.env` file in the root directory and add your API keys:

````env
VITE_CRYPTOCOMPARE_API_KEY=your_cryptocompare_api_key
VITE_COINRANKING_API_KEY=your_coinranking_api_key
VITE_NEWS_API_KEY=your_news_api_key
````

## Project Structure
src/
├── components/
│   ├── GlobalStats/
│   ├── CoinDetails/
│   ├── Exchanges/
│   └── News/
├── services/
│   ├── coinRankingApi.js
│   ├── newsApi.js
│   └── cryptoCompareApi.js
├── store/
│   ├── store.js
│   └── reducers/
├── utils/
├── App.js
└── index.js

## Skills Demonstrated

- Modern React Development
- State Management with Redux
- API Integration and Data Fetching
- Data Visualization
- Responsive Web Design
- Error Handling
- Performance Optimization
- Component Architecture
- Route Management
- Environment Configuration
