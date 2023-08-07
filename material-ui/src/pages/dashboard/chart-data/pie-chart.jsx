import Chart from "react-apexcharts";

const PieChart = ({ conf }) => {

    function toPercentage( array ) {
        const total = array.reduce((acc, num) => acc + num, 0);
        const series = array.map(num => parseInt((num / total) * 100));
        return { total, series }
    }
    const { total, series } = toPercentage(conf.series);
    console.log(total, series);

  const options = {
    plotOptions: {
      radialBar: {
        offsetY: -35,
        hollow: {
          size: '25%',
          background: 'transparent'
        },
      },
    },
    states: {
        active: {
            filter: {
                type: 'none'
            }
        },
        hover: {
            filter: {
                type: 'none'
            }
        }
    },
    stroke: {
      lineCap: 'round',
        width: 0
    },
    
    dataLabels: {
      enabled: false,
    },
    labels: conf.categories,
    legend: {
        show: true,
        fontSize: 24,
        fontWeight: 600,
        markers: {
          width: 24,
          height: 24
        },
        itemMargin: {
          vertical: 20,
        }
    },
    colors: ['#a8e063', '#ef473a', '#00c6ff'],
    fill: {
      type: "solid",
      opacity: 1
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <Chart options={options} series={series} type="radialBar" height={350} width='100%' />
  );
};

export default PieChart;
