import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import OrderCount from "./OrderCount";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function ProductCard(props) {
  const { pictures, name, description, price, category, subcategory, dueDate } =
    props.product;

  const [date, setDate] = useState("");

  return (
    <Grid item xs={12} md={6} lg={3}>
      <StyledCard>
        <CardMedia
          sx={{ height: "12rem" }}
          image={pictures[0]}
          title={name}
          component="img"
        />
        <CardContent sx={{ padding: "1rem" }}>
          <Typography
            variant="h5"
            fontWeight={500}
            mb={1}
            color={"#343A40"}
            noWrap
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Typography variant="subtitle2" color="primary">
                {category}
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {subcategory}
              </Typography>
            </Box>
            <FormControl size="small" sx={{ marginBottom: 1 }}>
              <Select
                variant="standard"
                defaultValue={dueDate[0]}
                displayEmpty
                sx={{
                  color: "#6c757d",
                  fontSize: 12,
                }}
              >
                {dueDate.map((date) => (
                  <MenuItem value={date}>
                    <Typography variant="caption" color={"#6c757d"}>
                      {date}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography
            variant="body1"
            sx={{ color: "#65778a", height: "3rem", overflow: "hidden" }}
            paragraph
          >
            {description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={500} color={"#3889e8"}>
              {price}$
            </Typography>
            <OrderCount product={props.product} size={0} />
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

const StyledCard = styled(Card)({
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",

  "&:hover": {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    transform: "scale(1.025)",
  },
});
