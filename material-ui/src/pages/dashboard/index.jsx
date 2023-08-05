import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import EnhancedTable from "./EnhancedTable";
import CustomAreaChart from "./CustomAreaChart";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import CustomPieChart from "./CustomPieChart";

dayjs.locale("es");

import Greetings from "./Greetings";
import SlimCard from "./SlimCard";

export default function Dashboard({ data }) {
  //#region Functions

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

  //#endregion

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Greetings user={data.actualUser} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <CustomAreaChart
              hex="#0b930b"
              accent="#32CD32"
              type="ingresados"
              data={incomeData}
              amount={amount.income}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <CustomAreaChart
              hex="#d32f2f"
              accent="#FFC0CB"
              type="entregados"
              data={outcomeData}
              amount={amount.outcome}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <EnhancedTable data={rows} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <SlimCard type='value' value={data.TotalValue} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <SlimCard type='amount' value={data.TotalAmount} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <CustomPieChart data={data.cellars} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
