import { TableCell } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
    background: ${(props) => props.theme.colors.secondary};
    width: 100%;
    padding-right: 24px;
    padding-left: 24px;
    padding-top: 36px;
    padding-bottom: 36px;

    @media (${(props: any): string => props.theme.media.md}) {
        padding-right: 48px;
        padding-left: 48px;
        padding-top: 36px;
        padding-bottom: 36px;
    }
`;

const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
`;

export {
    Container,
    StyledTableCell
}