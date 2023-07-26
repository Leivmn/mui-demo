import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import EnhancedTable from "../components/EnhancedTable";
import CustomLineChart from "../components/CustomLineChart";

dayjs.locale("es");

export default function Home({ user }) {
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

  const incomeData = groupByMonth(user.incomeProducts);
  const outcomeData = groupByMonth(user.outcomeProducts);

  const arr1 = user.incomeProducts.map((item) => ({
    ...item,
    type: "Entrada",
  }));
  const arr2 = user.outcomeProducts.map((item) => ({
    ...item,
    type: "Salida",
  }));

  const rows = [...arr1, ...arr2].sort((income, outcome) => {
    const incomeDate = dayjs(income.date);
    const outcomeDate = dayjs(outcome.date);
    return outcomeDate - incomeDate;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} columns={12} padding={2}>
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={12} lg={6}>
            <CustomLineChart hex="#311b92" accent='#673ab7' type='Entrada' data={incomeData} amount={user.itemsAdded} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomLineChart hex="#ff5722" accent='#ff9800' type='Salida' data={outcomeData} amount={user.itemsRemoved} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <EnhancedTable data={rows} />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>Section</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
