import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function CustomLineChart({ hex, accent, type, data, amount }) {
  function hexToRGB(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return { r, g, b };
  }
  const colorRGB = hexToRGB(hex);
  const background = `linear-gradient(0deg, ${hex}, ${accent})`

  return (
    <Box sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",}}>
      <Grid container>
        <Grid item xs={12} md={2} lg={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              padding: 2,
              backgroundImage: background,
              height: "100%",
            }}
          >
            <Typography variant="h6" color="white">
              {type}
            </Typography>
            {type == "Entrada" ? (
              <ViewInArRoundedIcon sx={{ fontSize: 48 }} htmlColor="white" />
            ) : (
              <LocalShippingRoundedIcon sx={{ fontSize: 48 }} htmlColor="white" />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={10} lg={10}>
          <Box>
            <Box
              p={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 500 }}>{amount}</Typography>
              <Typography variant="subtitle2">Últimos 6 meses</Typography>
            </Box>
            <Box padding={1}>
              <ResponsiveContainer
                minWidth={160}
                width="100%"
                minHeight={128}
                height="100%"
                style={{ padding: "20px" }}
              >
                <LineChart data={data}>
                  <defs>
                    <filter id={hex} height="200%" width="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                      <feOffset dx="0" dy="3" result="offsetblur" />
                      <feComponentTransfer>
                        <feFuncR type="linear" intercept={colorRGB.r / 255} />
                        <feFuncG type="linear" intercept={colorRGB.g / 255} />
                        <feFuncB type="linear" intercept={colorRGB.b / 255} />
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="quantity"
                    name="Cantidad"
                    stroke={hex}
                    strokeWidth={3}
                    filter={`url(#${hex})`}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
