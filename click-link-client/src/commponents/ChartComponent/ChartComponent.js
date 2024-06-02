import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ data, options }) => {
    const chartRef = useRef(null);
    const myChartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Destroy the previous chart instance if it exists
        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        // Create new chart instance
        myChartRef.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (myChartRef.current) {
                myChartRef.current.destroy();
            }
        };
    }, [data, options]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
