import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Greetings({ user }) {
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

  return (
    <Box
      sx={{
        color: "#1b1b1b",
        padding: 4
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        {getGreeting()}, {user} !
      </Typography>
      <Typography variant="h6" sx={{ color: "#8d8d8d", fontWeight: 400 }}>
        Optimiza tus operaciones y mantén tu inventario siempre actualizado.
      </Typography>
    </Box>
  );
}
