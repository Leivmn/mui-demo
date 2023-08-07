import PropTypes from "prop-types";
import * as React from "react";
import { visuallyHidden } from "@mui/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
  TablePagination,
  TableSortLabel,
  Typography,
  TableContainer,
} from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "user", numeric: false, label: "USUARIO" },
  { id: "cellar", numeric: false, label: "BODEGA" },
  { id: "name", numeric: false, label: "NOMBRE" },
  { id: "type", numeric: false, label: "TIPO" },
  { id: "quantity", numeric: true, label: "CANTIDAD" },
  { id: "date", numeric: true, label: "FECHA" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead sx={{ ".MuiTableCell-root": { borderBottom: "none" } }}>
      <TableRow>
        <TableCell align="left" colSpan={6} sx={{ p: "32px 24px 16px" }}>
          <Typography variant="h6" color={"#191e27"} fontWeight={600}>
            Movimientos
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          ".MuiTableCell-root": {
            bgcolor: "#F8F9FA",
            color: "#2F3746",
            fontWeight: 500,
          },
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function StockChanges({ data }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box
      sx={{
        minWidth: "100%",
        bgcolor: "#FFF",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table stickyHeader>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ ".MuiTableCell-root": { color: "#333333" } }}
              >
                <TableCell component="th" scope="row">
                  {row.user}
                </TableCell>
                <TableCell align="left">{row.cellar}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {row.type == "ENTRADA" ? (
                    <Chip
                      label={row.type}
                      sx={{
                        bgcolor: "#dcf3c1",
                        color: "#386f1f",
                        fontWeight: 600,
                      }}
                    />
                  ) : (
                    <Chip
                      label={row.type}
                      sx={{
                        bgcolor: "#f2e2e0",
                        color: "#b42318",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 65 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
