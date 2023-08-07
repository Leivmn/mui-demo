import { Box, Grid, Typography, Avatar } from "@mui/material/";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LineChart from "./chart-data/line-chart";
import { useState } from "react";

const AreaChartCard = ({ data, type }) => {

  const [theme, setTheme] = useState("");
  const colors = {
    income: {
      avatar: "#386f1f",
      background: "#56ab2f",
      gradient: "linear-gradient(to right, #56ab2f, #a8e063)",
    },
    outcome: {
      avatar: "#841d28",
      background: "#cb2d3e",
      gradient: "linear-gradient(to right, #cb2d3e, #ef473a)",
    },
  };

  useState(() => {
    setTheme(type === "income" ? colors.income : colors.outcome);
  }, [type]);
  //     total: 999,
  //     data: {
  //       categories: ["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
  //       series: [
  //         {
  //           name: "Cantidad:",
  //           data: [10, 45, 8, 90, 20, 50],
  //         },
  //       ],
  //     },
  //   };

  const { total, conf } = data;

  return (
    <Box
      p={2}
      borderRadius={2}
      sx={{
        background: theme.background,
        background: theme.gradient,
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Avatar
                variant="rounded"
                sx={{
                  borderRadius: "8px",
                  width: 44,
                  height: 44,
                  backgroundColor: theme.avatar,
                  color: "#FFF",
                }}
              >
                {type == "income" ? (
                  <InventoryOutlinedIcon fontSize="1.5rem" />
                ) : (
                  <LocalShippingOutlinedIcon fontSize="1.5rem" />
                )}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color={'#323232'}>Últimos 6 meses</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    variant="h3"
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                  >
                    {total}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#e1e1e1",
                    }}
                  >
                    Productos {type === "income" ? "ingresados" : "entregados"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              {/* <Chart {...chartData} /> */}
              <LineChart conf={conf} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AreaChartCard;
