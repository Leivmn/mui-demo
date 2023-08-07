import { Box, Typography } from "@mui/material";
import PieChart from "./chart-data/pie-chart";

const PieChartCard = () => {
  const conf = {
    categories: ["Bodega A", "Bodega B", "Bodega C"],
    series: [5130, 4125, 5213],
  };

  return (
    <Box p={2} borderRadius={2} sx={{ bgcolor: '#FFF', height: '100%' }}>
      <Typography variant="h6" color={"#191e27"} fontWeight={600}>Bodegas</Typography>
      <PieChart conf={conf}/>
    </Box>
  );
};

export default PieChartCard;
