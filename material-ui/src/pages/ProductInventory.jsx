import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Basket from "../components/Basket";
import ProductInventoryHeader from "../components/ProductInventoryHeader";

function ProductInventory() {
  const products = useSelector((state) => state.product);
  const [state, setState] = useState(false);
  const toggleState = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const { filter, searchText } = useSelector((state) => state.filter);

  const filteredProducts = products.filter((product) => {
    if (filter === "name") {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    } else if (filter === "category") {
      return (
        product.category.toLowerCase().includes(searchText.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (filter === "price" && searchText !== "") {
      return product.price <= parseFloat(searchText);
    } else if (filter === "dueDate" && searchText !== "") {
      const searchTextDate = new Date(searchText);
      const productDueDate = new Date(product.dueDate);
      return productDueDate <= searchTextDate;
    }
    return true;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ProductInventoryHeader toggle={toggleState} />
      <Box component="nav"></Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Grid container spacing={3} p={2}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Box>
      <Drawer anchor="right" open={state} onClose={toggleState(false)}>
        <Basket toggle={toggleState} />
      </Drawer>
    </Box>
  );
}

export default ProductInventory;
