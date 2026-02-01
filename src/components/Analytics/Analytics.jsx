import React, { useEffect, useState } from 'react';
import './analytics.css';
import { useParams } from 'react-router-dom';
import { getUrlAnalytics } from '../../api/getUrlAnalytics.js';

const Analytics = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAnalytics = async () => {
      try {
        const result = await getUrlAnalytics(id, token);
        setAnalytics(result.data); // ✅ correct level
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (!analytics) return <div>Loading...</div>;

  /* ---------- Top Browsers ---------- */
  const browserStats = analytics.accessHistory.reduce((acc, item) => {
    const browser = item.userAgent?.browser || 'Unknown';
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  const topBrowsers = Object.entries(browserStats).map(
    ([name, count]) => ({ name, count })
  );

  /* ---------- Device Split ---------- */
  const deviceStats = analytics.accessHistory.reduce(
    (acc, item) => {
      const device =
        item.userAgent?.device?.toLowerCase() === 'desktop'
          ? 'desktop'
          : 'mobile';

      acc[device]++;
      return acc;
    },
    { mobile: 0, desktop: 0 }
  );

  const formatDate = (date) =>
    new Date(date).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  const getDeviceLabel = (device) => {
    if (!device) return 'Desktop';
    return device;
  };


  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <div className="analytics-header">
          <h2>Detail Analytics</h2>
        </div>

        {/* Total Clicks */}
        <div className="main-stat">
          <span className="count">{analytics.noOfClicks}</span>
          <span className="label">Total Clicks</span>
        </div>

        {/* Top Browsers */}
        <div className="analytics-section">
          <h3>Top Browsers</h3>
          {topBrowsers.map((b, i) => (
            <div key={i} className="browser-row">
              <div className="browser-info">
                <span>{b.name}</span>
                <span>{b.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Device Split */}
        <div className="device-split">
          <div className="device-box">
            <span className="device-val">{deviceStats.mobile}</span>
            <span className="device-label">Mobile</span>
          </div>
          <div className="device-box">
            <span className="device-val">{deviceStats.desktop}</span>
            <span className="device-label">Desktop</span>
          </div>
        </div>

        {/* Access History */}
        <div className="analytics-section">
          <h3>Access History</h3>

          {analytics.accessHistory.map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-left">
                <span className="browser-name">
                  {item.userAgent?.browser || 'Unknown Browser'}
                </span>
                <span className="device-info">
                  {item.userAgent?.os || 'Unknown OS'} •{' '}
                  {getDeviceLabel(item.userAgent?.device)}
                </span>
              </div>

              <div className="history-right">
                {formatDate(item.accessedAt)}
              </div>
            </div>
          ))}
        </div>


        <button className="back-btn" onClick={() => window.history.back()}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Analytics;
