import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphComponent = () => {


  const [floodData, setFloodData] = useState([]);
  useEffect(() => {
    // Generate random flood data for 7 days
    const generateRandomData = () => {
      return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    };

    setFloodData(generateRandomData());
  }, []);

  
  const data = {
    labels: ['1st Day', '2nd Day', '3rd Day', '4th Day', '5th Day', '6th Day', '7th Day'],
    datasets: [
      {
        label: 'Flood Level',
        data: floodData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Flood Mark'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Days'
        }
      }
    }
  };

  return (
    <div className='w-full mt-8'>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
