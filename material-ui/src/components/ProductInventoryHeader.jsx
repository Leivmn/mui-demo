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
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function ProductInventoryHeader({ toggle }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const filter = useSelector((state) => state.filter);

  const handleFilter = (event) => {
    dispatch(setSearchText(""));
    dispatch(setFilter(event.target.value));
  };

  const handleSearch = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    dispatch(setSearchText(dayjs(newDate).format("MM/DD/YYYY")));
  };

  return (
    <AppBar sx={{ backgroundColor: "#f5f5f5" }} component="div">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
            <InputLabel>Filter</InputLabel>
            <Select
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
          {filter.filter === "dueDate" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              label="Search"
              size="small"
              color="primary"
              sx={{ m: 1, minWidth: 100 }}
              onChange={handleSearch}
            />
          )}
        </Box>
        <IconButton onClick={toggle(true)}>
          <FactCheckRoundedIcon color="primary" fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
