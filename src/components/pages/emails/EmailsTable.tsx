import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { IEmails } from "../../../types/IEmails";
import { isMobile } from "../../../utils/isMobile";
import { StyledTableCell } from "./Emails.styles";

interface EmailsTableProps {
  data: IEmails;
}

const EmailsTable = ({ data }: EmailsTableProps): JSX.Element => {
  const { columns, rows } = data;
  const theme = useTheme() as DefaultTheme;
  const mobile = isMobile();

  console.log(rows);

  return (
    <>
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
                  {row.description}
                </StyledTableCell>
                <StyledTableCell>{row.active ? "Sim" : "Não"}</StyledTableCell>
                <StyledTableCell>Ver conteúdo</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmailsTable;
