import Chart from 'react-apexcharts';

const LineChart = ({ conf }) => {
  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#FFF'],
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    xaxis: {
        categories: conf.categories
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: false,
      },
      y: {
        title: "Total Order",
      },
      marker: {
        show: false,
      },
    },
  };

  return <Chart options={options} series={conf.series} type='line' height={96}/>;
};

export default LineChart;
