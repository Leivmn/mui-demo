import Chart from "react-apexcharts";

const PieChart = ({ conf }) => {
  const options = {
    colors: ["#56ab2f", "#cb2d3e", "#0072ff"],
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        gradientToColors: ["#a8e063", "#ef473a", "#00c6ff"],
      },
    },
    labels: conf.categories,
    stroke: {
      width: 4,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: 16,
      fontWeight: 600,
      markers: {
        width: 16,
        height: 16,
      },
      itemMargin: {
        vertical: 20,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
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
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
        expandOnClick: false,
      },
    },
  };

  return (
    <Chart options={options} series={conf.series} type="pie" height={352} />
  );
};

export default PieChart;
