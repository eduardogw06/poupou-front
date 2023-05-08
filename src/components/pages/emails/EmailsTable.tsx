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
import { SeeContent, StyledTableCell } from "./Emails.styles";
import Link from "next/link";
import { IGetEmail } from "../../../types/IGetEmail";

interface EmailsTableProps {
  data: IEmails;
}

const EmailsTable = ({ data }: EmailsTableProps): JSX.Element => {
  const { columns, rows } = data;
  const theme = useTheme() as DefaultTheme;

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
            {rows.map(
              (row: IGetEmail): JSX.Element => (
                <TableRow
                  key={row.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.active ? "Sim" : "Não"}
                  </StyledTableCell>
                  <StyledTableCell>
                    <SeeContent>
                      <Link href={`/emails/${row.uuid}`}>Ver conteúdo</Link>
                    </SeeContent>
                  </StyledTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmailsTable;
