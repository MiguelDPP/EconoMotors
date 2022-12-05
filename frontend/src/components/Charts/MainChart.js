import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainChart = ({ data }) => {
  const chartData = (data != null) ? data : {
    datasets: [
      {
        label: 'Esperando Data',
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        borderWidth: 1,
        hoverBackgroundColor: '#f87979',
        hoverBorderColor: '#f87979',
        data: [],
      },
    ],
  };


  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar data={chartData} options={chartOptions} />
  );
};

export default MainChart;