import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  decreaseFromBasket,
} from "../features/products/basketSlice";
import styled from "@emotion/styled";

export default function OrderCount(props) {
  const dispatch = useDispatch();
  const basketProduct = useSelector((state) =>
    state.basket.find((item) => item.id === props.product.id)
  );
  const amount = basketProduct ? basketProduct.amount : 0;

  const handleAddToBasket = () => {
    const { id, name, pictures, price } = props.product;
    dispatch(
      addToBasket({
        id,
        name,
        pictures,
        price,
        amount: 1,
      })
    );
  };

  const handleDecreaseFromBasket = () => {
    if (amount > 0) {
      dispatch(
        decreaseFromBasket({
          id: props.product.id,
          amount: 1,
        })
      );
    }
  };

  //#region Variable Size

  const getIconSize = () => {
    if (props.size === 1) {
      return 20;
    }
    return undefined;
  };

  //#endregion

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "0.5rem",
        padding: "0.2rem",
        width: "fit-content",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => handleDecreaseFromBasket()}
        sx={{ backgroundColor: "#fff", borderRadius: "0.2rem 0 0 0.2rem" }}
        size={props.size === 1 ? "small" : undefined}
      >
        <RemoveRoundedIcon sx={{ fontSize: getIconSize() }} />
      </IconButton>
      <StyledInput value={amount} disabled size={props.size} />
      <IconButton
        onClick={() => handleAddToBasket()}
        sx={{ backgroundColor: "#fff", borderRadius: "0 0.2rem 0.2rem 0" }}
        size={props.size === 1 ? "small" : undefined}
      >
        <AddRoundedIcon sx={{ fontSize: getIconSize() }} />
      </IconButton>
    </Stack>
  );
}

const StyledInput = styled("input")(({ size }) => ({
  display: "flex",
  backgroundColor: "#f5f5f5",
  color: "#495057",
  fontSize: "1rem",
  fontWeight: 500,
  width: "1.5rem",
  border: "none",
  appearance: "none",
  textAlign: "center",
  ...(size === 1 && {
    fontSize: "0.9rem",
    width: "1rem",
  }),
}));
