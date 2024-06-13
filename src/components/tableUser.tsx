import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

interface UserListProps {
  data: { id: string; name: string; email: string; age: number }[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TableUser: React.FC<UserListProps> = ({ data }) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
      <Table size="small" sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row" align="center">
              Name
            </StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.age}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
