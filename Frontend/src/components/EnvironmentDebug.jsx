import React from 'react';

const EnvironmentDebug = () => {
  return (
    <div style={{ display: 'none' }}>
      <h3>Environment Variables Debug</h3>
      <p>News API Key Exists: {!!import.meta.env.VITE_NEWS_API_KEY ? 'Yes' : 'No'}</p>
      <p>News API Key (partial): {import.meta.env.VITE_NEWS_API_KEY?.slice(0, 5)}...</p>
    </div>
  );
};

export default EnvironmentDebug;