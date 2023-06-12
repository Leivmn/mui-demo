import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import OrderCount from "./OrderCount";
import Typography from "@mui/material/Typography";
import logo from "../assets/react.svg";
import Card from "@mui/material/Card";
import { removeFromBasket } from "../features/products/basketSlice";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function Basket({ toggle }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const handleRemoveFromBasket = ({ product }) => {
    const { id } = product;
    console.log(product.name);
    dispatch(removeFromBasket({ id }));
  };

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: "#191e27",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
      role="presentation"
      onKeyDown={toggle(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0.5rem 0",
          gap: 0.5,
        }}
      >
        <img src={logo} alt="logo" />
        <Typography variant="h5" color={"white"} fontWeight={"bold"}>
          Basket
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          overflowY: "scroll",
          gap: 20,
        }}
      >
        {basket.map((product) => (
          <Card
            key={product.id}
            sx={{
              display: "flex",
              height: "5rem",
              padding: 1,
              bgcolor: "#222835",
              marginBottom: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: "auto", width: "4rem", borderRadius: "0.3rem" }}
              image={product.pictures[0]}
              tittle={product.name}
            />
            <CardContent
              sx={{
                padding: 0,
                marginLeft: 1,
                width: 135,
              }}
            >
              <Typography
                variant="subtitle1"
                color={"white"}
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {product.name}
              </Typography>
              <OrderCount product={product} size={1} />
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="error"
                onClick={() => handleRemoveFromBasket({ product })}
              >
                <DeleteForeverRoundedIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>
      <Button variant="contained" sx={{ borderRadius: 0 }}>
        Checkout
      </Button>
    </Box>
  );
}
