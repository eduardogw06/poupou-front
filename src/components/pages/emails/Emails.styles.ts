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

const PageTitleLink = styled.div``;

const InputRow = styled.div`
    width: calc(100vw - 104px);
    flex-wrap: wrap;

    grid-auto-rows: auto !important;
    flex-direction: row;
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    margin-bottom: ${(props: any): string => props.theme.sizes.medium2};

    & > :nth-child(odd) {
        flex-basis: 100% !important;
        margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
        width: 100%
    }

    & > :nth-child(even) {
        flex-basis: 100% !important;
        width: 100%
    }

    @media(${(props) => props.theme.media.md}) {
        width: calc(100vw - 96px);
        flex-wrap: wrap;

        grid-auto-rows: auto !important;
        flex-direction: row;
        width: calc(100vw - 216px);
        margin-top: ${(props: any): string => props.theme.sizes.medium2};
        margin-bottom: ${(props: any): string => props.theme.sizes.medium2};

        & > :nth-child(odd) {
            margin-right: 4%;
            flex-basis: 48% !important;
        }

        & > :nth-child(even) {
            flex-basis: 48% !important;
        }
    }
`;

const SubmitButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
`;

const EditEmailForm = styled.form``;

const SeeContent = styled.div`
    & > a {
        text-decoration: none;
        color: ${(props: any): string => props.theme.colors.text}
    }
`;

export {
    Container,
    StyledTableCell,
    HeaderTitle,
    PageTitleLink,
    InputRow,
    EditEmailForm,
    SubmitButtonRow,
    SeeContent
}