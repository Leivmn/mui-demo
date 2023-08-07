import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import "dayjs/locale/es";
import AreaChartCard from "./AreaChartCard";
import PieChartCard from "./PieChartCard";
import Greetings from "./Greetings";
import SlimCard from "./SlimCard";
import StockChanges from "./StockChanges";


dayjs.locale("es");

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
    type: "ENTRADA",
  }));
  const arr2 = data.outcomeProducts.map((item) => ({
    ...item,
    type: "SALIDA",
  }));

  const rows = [...arr1, ...arr2].sort((income, outcome) => {
    const incomeDate = dayjs(income.date);
    const outcomeDate = dayjs(outcome.date);
    return outcomeDate - incomeDate;
  });

  //#endregion

  const TestIncome = {
    total: 999,
    conf: {
      categories: ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
      series: [
        {
          name: "Cantidad:",
          data: [16, 80, 19, 76, 10, 99],
        },
      ],
    },
  };

  const TestOutcome = {
    total: 999,
    conf: {
      categories: ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
      series: [
        {
          name: "Cantidad:",
          data: [10, 45, 8, 90, 20, 50],
        },
      ],
    },
  };

  const TestData = {
    series: [44, 55, 41]
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Greetings user={data.actualUser} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <AreaChartCard data={TestIncome} type="income" />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <AreaChartCard data={TestOutcome} type="outcome" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={8}>
            {/* <EnhancedTable data={rows} /> */}
            <StockChanges data={rows}/>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <SlimCard type="value" value={data.TotalValue} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <SlimCard type="amount" value={data.TotalAmount} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <PieChartCard />
                {/* <CustomPieChart data={data.cellars} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
