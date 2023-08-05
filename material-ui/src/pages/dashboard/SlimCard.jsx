import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import styled from "@mui/material/styles/styled";

export default function SlimCard({ type, value }) {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: type == 'value' ? '#3e9c35' : '#1565c0',
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <List sx={{ py: 0 }}>
        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={{
                borderRadius: "8px",
                width: 44,
                height: 44,
                backgroundColor: type == 'value' ? '#85BB65' : '#2196f3',
                color: "#FFF",
              }}
            >
              {type == "value" ? (
                <AttachMoneyIcon fontSize="1.5rem" />
              ) : (
                <InventoryIcon fontSize="1.5rem" />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{
              py: 0,
              mt: 0.45,
              mb: 0.45,
            }}
            primary={
              <Typography variant="h6" color="white">
                {value}
              </Typography>
            }
            secondary={
              <Typography variant="subtitle2" color="#E0E0E0" mt={0.25}>
                {type == "value" ? "Total aproximado" : "Cantidad total"}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}
