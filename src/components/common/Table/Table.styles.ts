import { TableCell } from "@mui/material";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
`;

const TableActionIconContainer = styled.div`
  > * {
    margin-right: 12px;
  }
`;

export {
    StyledTableCell,
    TableActionIconContainer
}