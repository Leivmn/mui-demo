import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Greetings({ user }) {

  return (
    <Box
      sx={{
        bgcolor: '#191e27',
        color: "#FAFAFA",
        borderRadius: 2,
        padding: 4
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Bienvenido, {user} !
      </Typography>
      <Typography variant="h6" sx={{ color: "#e1e1e1", fontWeight: 400 }}>
        Optimiza tus operaciones y mantén tu inventario siempre actualizado.
      </Typography>
    </Box>
  );
}
