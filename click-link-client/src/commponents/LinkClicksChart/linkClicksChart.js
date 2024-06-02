import React from 'react';
import ChartComponent from '../ChartComponent/ChartComponent.js';

const LinkClicksChart = ({ linkClicksData }) => {
  return (
    <div>
      <h2>Clicks Distribution</h2>
      <ChartComponent data={linkClicksData} />
    </div>
  );
};


export default LinkClicksChart;
