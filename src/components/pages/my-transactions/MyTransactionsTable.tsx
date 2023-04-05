import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { IconContainer, StyledTableCell } from "./MyTransactions.styles";
import { getFontAwesomeIcon } from "../../../utils/getFontAwesomeIcon";
import { MyTransactionsData } from "../../../types/IMyTransactions";

interface MyTransationsTableProps {
  data: MyTransactionsData;
}

const MyTransationsTable = ({ data }: MyTransationsTableProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { columns, rows } = data;

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.colors.secondary,
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column: string): JSX.Element => {
              return <StyledTableCell key={column}>{column}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.uuid}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.amount}
              </StyledTableCell>
              <StyledTableCell>{row.target.description}</StyledTableCell>
              <StyledTableCell>
                {format(new Date(row.date), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </StyledTableCell>
              <StyledTableCell>
                <IconContainer>
                  <FontAwesomeIcon
                    icon={getFontAwesomeIcon("gear")}
                    size="1x"
                    color={theme.colors.text}
                  />
                  <FontAwesomeIcon
                    icon={getFontAwesomeIcon("trash")}
                    size="1x"
                    color={theme.colors.text}
                  />
                </IconContainer>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTransationsTable;
