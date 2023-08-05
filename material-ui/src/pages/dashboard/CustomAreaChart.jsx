import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import {
  LineChart,
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function CustomAreaChart({ hex, accent, type, data, amount }) {
  
  return (
    <Box
      sx={{
        borderRadius: 2,
        padding: 2,
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        bgcolor: "#FFF",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 500, alignItems: "flex-end" }}
      >
        Productos {type}
      </Typography>
      <Grid container>
        <Grid item xs={6} sx={{ alignSelf: "flex-end" }}>
          <Box>
            <Typography variant="h3" sx={{ color: "#1b1b1b", fontWeight: 600 }}>
              {amount}
            </Typography>
            <Typography variant="body2" color={'#425064'}>Últimos 6 meses</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <ResponsiveContainer
            minWidth={160}
            width="100%"
            minHeight={160}
            height="100%"
          >
            <AreaChart data={data} margin={{ top: 8, left: 0, right: 0 }}>
              <defs>
                <linearGradient id={hex} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={hex} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip labelFormatter={(name) => `${data[name].month}`} />
              <Area
                type="monotone"
                dataKey="quantity"
                name="Cantidad"
                stroke={hex}
                fill={`url(#${hex})`}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  stroke: hex,
                  fill: "white",
                  r: 6,
                }}
                filter={`url(#${hex})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
