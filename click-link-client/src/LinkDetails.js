import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './LinkDetails.css';

const LinkDetails = ({ link }) => {
  const dateChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const dateChartInstanceRef = useRef(null);
  const pieChartInstanceRef = useRef(null);

  useEffect(() => {
    if (link) {
      // Destroy existing charts if they exist
      if (dateChartInstanceRef.current) {
        dateChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
  
      // Create date chart
      const dateCtx = dateChartRef.current;
      const dateData = [];
      const dateLabels = [];
  
      // Count clicks per day for the last week
      const clicksPerDay = {};
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7); // Calculate date for a week ago
      link.clicks.forEach(click => {
        const clickDate = new Date(click.insertedAt);
        if (clickDate >= lastWeek) { // Check if the click occurred within the last week
          const date = clickDate.toLocaleDateString();
          clicksPerDay[date] = (clicksPerDay[date] || 0) + 1;
        }
      });
  
      // Create data array with counts for each day
      Object.keys(clicksPerDay).forEach(date => {
        dateLabels.push(date);
        dateData.push(clicksPerDay[date]);
      });
  
      dateChartInstanceRef.current = new Chart(dateCtx, {
        type: 'line',
        data: {
          labels: dateLabels,
          datasets: [{
            label: 'Clicks Over Time',
            data: dateData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day' // יחידות של יום
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
  
      // Create pie chart dynamically based on target values
      const pieCtx = pieChartRef.current;
      const pieLabels = [];
      const pieData = [];
  
      link.targetValues.forEach(value => {
        pieLabels.push(value.name);
        let clickCount = 0;
        link.clicks.forEach(click => {
          if (click.targetParamValue === value.value) {
            clickCount++;
          }
        });
        pieData.push(clickCount);
      });
  
      // Check if there are any clicks with undefined target values and count them
      let undefinedClickCount = 0;
      link.clicks.forEach(click => {
        if (!link.targetValues.find(value => value.value === click.targetParamValue)) {
          undefinedClickCount++;
        }
      });
  
      if (undefinedClickCount > 0) {
        pieLabels.push('Other');
        pieData.push(undefinedClickCount);
      }
  
      pieChartInstanceRef.current = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: pieLabels,
          datasets: [{
            label: 'Clicks Distribution',
            data: pieData,
            backgroundColor: ['rgba(0, 191, 255, 0.8)', 'rgba(255, 20, 147, 0.8)', 'rgba(30, 144, 255, 0.8)', 'rgba(255, 69, 0, 0.8)', 'rgba(144, 238, 144, 0.8)'],
            borderColor: ['rgba(0, 0, 128, 1)', 'rgba(219, 112, 147, 1)', 'rgba(0, 0, 205, 1)', 'rgba(165, 42, 42, 1)', 'rgba(0, 128, 0, 1)']
,            
            borderWidth: 2
          }]
        }
      });
    }
  }, [link]);
  

  return (
    <div className="link-details">
      <h2>Details for {link.originalUrl}</h2>
      <p>Clicks: {link.clicks.length}</p>
      <div className="charts">
        <div className="chart">
          <h3>Clicks Over Time</h3>
          <canvas ref={dateChartRef}></canvas>
        </div>
        {link.targetValues.length > 0 && (
          <div className="chart">
            <h3>Clicks Distribution</h3>
            <canvas ref={pieChartRef}></canvas>
          </div>
        )}
      </div>
      {/* <ul>
        {link.clicks.map((click, index) => (
          <li key={index}>
            Time: {new Date(click.insertedAt).toLocaleString()}, IP: {click.ipAddress}, Target Param: {click.targetParamValue}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default LinkDetails;
