import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GlobalStateContext } from '../helper/context';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const GraphComponent = () => {


  const [floodData, setFloodData] = useState([]);
  const { coor } = useContext(GlobalStateContext);


  const fetchData = async () => {
    try {
       const {latitude, longitude} = coor;
       console.log(coor);
       const response = await fetch(`http://localhost:4000/api/v1/floodprobaility/riverdata?latitude=${latitude}&longitude=${longitude}`);
       const data = await response.json(); // Parse JSON response
      console.log(data); // Log data to inspect its structure
      
      // Check if data is an array
      if (Array.isArray(data)) {
        const dischargeData = data.map(item => item.river_discharge);
        setFloodData(dischargeData);
        console.log(dischargeData);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching flood data:', error);
    }
  };
  
  

  
  const data = {
    labels: ['1st Day', '2nd Day', '3rd Day', '4th Day', '5th Day', '6th Day', '7th Day'],
    datasets: [
      {
        label: 'Water discharge (m3/s)',
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
          text: 'Water discharge (m3/s)'
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
      <button onClick={fetchData} className='bg-green-800 hover:bg-green-700 text-white p-3 rounded-md font-bold w-full transition duration-200 ease-in-out transform hover:scale-105'>
         Get Discharge Data
      </button>
    </div>
  );
};

export default GraphComponent;
