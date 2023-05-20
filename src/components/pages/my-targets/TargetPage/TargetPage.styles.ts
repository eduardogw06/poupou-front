import { Tab, Tabs } from "@mui/material";
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
        text-decoration: none;
    }

    @media(${(props) => props.theme.media.md}) {
        width: 50%;
    }
`;

const PageTitleLink = styled.div`
`;

const StyledTabs = styled(Tabs)`
    .css-1aquho2-MuiTabs-indicator {
        display: none;
    }
    
     & > div > div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > *{
            border-radius: 0px !important;
        }

        & > button {
            padding: 0px 0px !important;
            background-color: ${(props) => props.theme.colors.primary};
            min-height: 20px;
        }
    }
    

    @media (${(props: any): string => props.theme.media.md}) {
        & > div > div {
            display: flex;
            flex-direction: row;
            justify-content: center;

            & > :first-child {
                border-radius: 8px 0px 0px 8px !important;
            }

            & > :last-child{

                border-radius: 0px 8px 8px 0px !important;
            }

            & > button {
                padding: 0px 60px !important;
                background-color: ${(props) => props.theme.colors.primary};
            }
        }
    }
`;

const StyledTab = styled(Tab)`    
    font-family: WorkSans Light !important;
    font-size: 12px !important;
    color: ${props => props.theme.colors.text} !important;
    text-transform: none !important;

    @media (${(props: any): string => props.theme.media.md}) {
        font-size: 20px !important;
    }
`;

export {
    Container,
    PageTitleLink,
    StyledTabs,
    StyledTab,
    HeaderButtons,
    HeaderTitle
};
