import { TableCell } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.colors.secondary};

  width: 100%;

  @media (${(props: any): string => props.theme.media.md}) {
    padding-right: 48px;
    padding-left: 48px;
    padding-top: 36px;
    padding-bottom: 36px;
  }
`;

const NewTransaction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
`;

const IconContainer = styled.div`
  > * {
    margin-right: 12px;
  }
`;


export {
  Container,
  NewTransaction,
  StyledTableCell,
  IconContainer
};
