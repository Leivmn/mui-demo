import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useState } from "react";

export default function SlimCard({ type, value }) {
  const [theme, setTheme] = useState("");
  const colors = {
    income: {
      avatar: "#e3e97c",
      background: "#dce35b",
      gradient: "linear-gradient(to right,  #dce35b, #45b649)",
    },
    outcome: {
      avatar: "#33d1ff",
      background: "#0072ff",
      gradient: "linear-gradient(to right, #00c6ff, #0072ff)",
    },
  };

  useState(() => {
    setTheme(type === "value" ? colors.income : colors.outcome);
  }, [type]);

  return (
    <Box
      sx={{
        p: 2,
        background: theme.background,
        background: theme.gradient,
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
                background: theme.avatar,
                color: "#1b1b1b",
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
              <Typography variant="h4" sx={{ color: '#1c3710', fontWeight: 600 }} >
                {value}
              </Typography>
            }
            secondary={
              <Typography variant="subtitle2" color="#2d5919" mt={0.25}>
                {type == "value" ? "Total aproximado" : "Cantidad total"}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}
