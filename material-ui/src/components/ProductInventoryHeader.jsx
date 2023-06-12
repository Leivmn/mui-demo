import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { setFilter, setSearchText } from "../features/products/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductInventoryHeader({ toggle }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const handleFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };
  const handleSearch = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  return (
    <AppBar sx={{ backgroundColor: "#f5f5f5" }} component="div">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Filter</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filter.filter}
              label="Filter"
              onChange={handleFilter}
            >
              <MenuItem value="name">Nombre</MenuItem>
              <MenuItem value="category">Categoría</MenuItem>
              <MenuItem value="price">Precio</MenuItem>
              <MenuItem value="dueDate">Expiración</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            id="outlined-size-small"
            size="small"
            color="primary"
            sx={{ m: 1, minWidth: 100 }}
            onChange={handleSearch}
          />
        </Box>
        <IconButton onClick={toggle(true)}>
          <FactCheckRoundedIcon color="primary" fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
