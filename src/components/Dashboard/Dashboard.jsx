import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    
  },[]);
  const [urls] = useState([
    { id: 1, original: "https://google.com", short: "shrt.it/g12", clicks: 145, status: "Active" },
    { id: 2, original: "https://github.com", short: "shrt.it/git", clicks: 890, status: "Active" },
    { id: 3, original: "https://react.dev", short: "shrt.it/rct", clicks: 52, status: "Paused" }
  ]);

  return (
    <div className="dash-container">
      <header className="dash-header">
        <h2>URL Analytics</h2>
        <button className="create-btn">+ Create New</button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Links</span>
          <span className="stat-value">24</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Clicks</span>
          <span className="stat-value">1.2k</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(url => (
              <tr key={url.id}>
                <td className="truncate">{url.original}</td>
                <td className="short-link">{url.short}</td>
                <td><strong>{url.clicks}</strong></td>
                <td><span className={`badge ${url.status.toLowerCase()}`}>{url.status}</span></td>
                <td><button className="view-btn">Analytics</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;