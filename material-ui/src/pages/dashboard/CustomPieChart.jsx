import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function CustomPieChart({ data }) {
  const COLORS = ["#3ac94b", "#fc3b3a", "#3168fe"];

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
      <Typography variant="h6" sx={{ fontWeight: 500, alignItems: "flex-end" }}>
        Bodegas
      </Typography>
      <ResponsiveContainer
        minWidth={224}
        width="100%"
        minHeight={316}
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            innerRadius='50%'
            outerRadius='100%'
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="radial"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={0}
            formatter={(value, entry, index) => {
              const percentage = (
                (entry.payload.value /
                  data.reduce((acc, cur) => acc + cur.value, 0)) *
                100
              ).toFixed(2);
              return (
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: COLORS[index % COLORS.length],
                    }}
                  >
                    {percentage}%
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#000" }}>
                    {entry.payload.name}
                  </Typography>
                </Box>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
