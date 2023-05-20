import { Table, TableCell } from "@mui/material";
import styled from "styled-components";

const StyledTable = styled(Table)`
  @media(${(props) => props.theme.media.md}) {
    min-width: 650px;
  }
`;

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
`;

const TableActionIconContainer = styled.div`
  > * {
    margin-right: 4px;
  }

  @media(${(props) => props.theme.media.md}) {
    > * {
      margin-right: 12px;
    }
  }
`;

export {
  StyledTable,
  StyledTableCell,
  TableActionIconContainer
}