import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { getAllUrls } from '../../api/getAllUrls.js';
import Analytics from '../Analytics/Analytics.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [urls,setUrls] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const getAllUrlData = async () => {
      try {
        const result =  await getAllUrls(token);
        setUrls(result.data);
      } catch (error) {
        
      }
    }
    getAllUrlData();
  },[token]);


  const showAnalytics = (urlId) => {
    navigate(`/analytics/${urlId}`);
  }

  // const [urls] = useState([
  //   { id: 1, original: "https://google.com", short: "shrt.it/g12", clicks: 145, status: "Active" },
  //   { id: 2, original: "https://github.com", short: "shrt.it/git", clicks: 890, status: "Active" },
  //   { id: 3, original: "https://react.dev", short: "shrt.it/rct", clicks: 52, status: "Paused" }
  // ]);

  return (
    <div className="dash-container">
      <header className="dash-header">
        <h2>URL Analytics</h2>
        <button className="create-btn"
          onClick={() => navigate('/create-link')}
        >
          + Create New
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Links</span>
          <span className="stat-value">{urls.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Clicks</span>
          <span className="stat-value">{urls.reduce((acc, url) => acc + url.clickCount, 0)}</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="dash-table">
          <thead>
            <tr>
              <th>URL Name</th>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(url => (
              <tr key={url.urlId}>
                <td><strong>{url?.urlName || `---`}</strong></td>
                <td className="truncate">{url.longUrl}</td>
                <td className="short-link">
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                </td>
                <td><span className={`badge ${url.status.toLowerCase()}`}>{url.status}</span></td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => showAnalytics(url.urlId)}
                  >
                    Analytics
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;