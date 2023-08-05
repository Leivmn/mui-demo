import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import EnhancedTable from "../components/EnhancedTable";
import CustomAreaChart from "../components/CustomAreaChart";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import CustomPieChart from "../components/CustomPieChart";

dayjs.locale("es");

export default function Home({ data }) {
  const groupByMonth = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const month = dayjs(item.date).format("MMMM");
      acc[month] = (acc[month] || 0) + item.quantity;
      return acc;
    }, {});

    const last6Months = Array.from({ length: 6 }, (_, index) =>
      dayjs().subtract(index, "month").format("MMMM")
    ).reverse();

    const incomeData = last6Months.map((month) => ({
      month,
      quantity: groupedData[month] || 0,
    }));

    return incomeData;
  };

  const totalAmount = (data) => {
    let total = 0;

    for (const item of data) {
      if (item.hasOwnProperty("quantity")) {
        total += item.quantity;
      }
    }

    return total;
  };

  const amount = {
    income: totalAmount(data.incomeProducts),
    outcome: totalAmount(data.outcomeProducts),
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting = "";

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Buenas tardes";
    } else {
      greeting = "Buenas noches";
    }

    return greeting;
  };

  const incomeData = groupByMonth(data.incomeProducts);
  const outcomeData = groupByMonth(data.outcomeProducts);

  const arr1 = data.incomeProducts.map((item) => ({
    ...item,
    type: "Entrada",
  }));
  const arr2 = data.outcomeProducts.map((item) => ({
    ...item,
    type: "Salida",
  }));

  const rows = [...arr1, ...arr2].sort((income, outcome) => {
    const incomeDate = dayjs(income.date);
    const outcomeDate = dayjs(outcome.date);
    return outcomeDate - incomeDate;
  });

  return (
    <Grid container spacing={2}>
      <Grid item x={12}>
        <Grid container spacing={2}>

        </Grid>

      </Grid>
      
    </Grid>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  padding: 16,
  height: "100%",
  backgroundColor: "red",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
}));
