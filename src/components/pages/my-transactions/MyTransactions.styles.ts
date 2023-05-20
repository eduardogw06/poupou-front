import { Table, TableCell } from "@mui/material";
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

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
  font-size: 10px !important;
  line-height: 10px;

  @media(${(props) => props.theme.media.md}) {
    font-size: 14px !important;
    line-height: 22px;
  }
`;

const StyledTable = styled(Table)`
  @media(${(props) => props.theme.media.md}) {
    min-width: 650px;
  }
`;

const IconContainer = styled.div`
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
  Container,
  StyledTableCell,
  IconContainer,
  StyledTable
};
