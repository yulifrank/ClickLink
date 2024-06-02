import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './UrlClicksChart.css';

const UrlClicksChart = ({ data, onLinkClick }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current;

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const labels = data.map((url) => url.originalUrl);
        const clicks = data.map((url) => url.clicks.length);

        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Clicks per URL',
              data: clicks,
              backgroundColor: 'rgba(0, 191, 255, 0.8)',
              borderColor: 'rgba(255, 20, 147, 0.8)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [data]);

  const handleLinkClick = (url) => {
    onLinkClick(url);
    const element = document.getElementById(`url-${url.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='urlClicksChart'>
      <h2>URL Clicks Chart</h2>
      <canvas id="urlClicksChart" ref={chartRef}></canvas>
      <div className="url-list">
        {data.map((url) => (
          <div key={url.id} className="url-item" id={`url-${url.id}`}>
            <span>{url.originalUrl}</span>
            <button onClick={() => handleLinkClick(url)}>Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlClicksChart;
