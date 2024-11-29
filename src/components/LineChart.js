import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, options }) => {
 console.log(data);
 

  return (
    <div className='w-full h-full text-text_primary'>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
