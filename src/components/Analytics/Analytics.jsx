import React, { useState } from 'react';
import './analytics.css';

const Analytics = () => {
  const [data] = useState({
    title: "Summer Sale Campaign",
    shortUrl: "shrt.it/sale2025",
    totalClicks: 1240,
    browsers: [
      { name: "Chrome", count: 820, percentage: 66 },
      { name: "Safari", count: 210, percentage: 17 },
      { name: "Firefox", count: 120, percentage: 10 },
      { name: "Others", count: 90, percentage: 7 }
    ],
    devices: { mobile: "75%", desktop: "25%" }
  });

  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <div className="analytics-header">
          <h2>Detail Analytics</h2>
          <p>{data.shortUrl}</p>
        </div>

        <div className="main-stat">
          <span className="count">{data.totalClicks}</span>
          <span className="label">Total Clicks</span>
        </div>

        <div className="analytics-section">
          <h3>Top Browsers</h3>
          {data.browsers.map((b, i) => (
            <div key={i} className="browser-row">
              <div className="browser-info">
                <span>{b.name}</span>
                <span>{b.count}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${b.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="device-split">
          <div className="device-box">
            <span className="device-val">{data.devices.mobile}</span>
            <span className="device-label">Mobile</span>
          </div>
          <div className="device-box">
            <span className="device-val">{data.devices.desktop}</span>
            <span className="device-label">Desktop</span>
          </div>
        </div>
        
        <button className="back-btn" onClick={() => window.history.back()}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Analytics;