import { Table, TableCell } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 24px;

  @media (${(props: any): string => props.theme.media.md}) {
    padding-right: 48px;
    padding-left: 48px;
    padding-top: 36px;
    padding-bottom: 36px;
  }
`;

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: row;

    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${(props: any): string => props.theme.sizes.medium3};
    line-height: ${(props: any): string => props.theme.sizes.large3};
    color: ${(props: any): string => props.theme.colors.text};
    cursor: pointer;

    @media(${(props) => props.theme.media.md}) {
        font-size: ${(props: any): string => props.theme.sizes.large1};
    }
`;

const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

     & > :first-child {
        margin-right: 20px;
    }

    @media(${(props) => props.theme.media.md}) {
        width: 50%;
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
  HeaderTitle,
  HeaderButtons,
  StyledTableCell,
  IconContainer,
  StyledTable
};
