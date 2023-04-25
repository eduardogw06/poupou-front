import { Tab, Tabs } from "@mui/material";
import { darken } from "polished";
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

    /* '& .MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui-selected': {
        background-color: ${props => props.theme.colors.tertiary};
        font-family: 'Poppins Medium';
        color: ${props => props.theme.colors.text} !important;
        text-transform: none;
    } */
`;

const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 50%;

    & > :first-child {
        margin-right: 20px;
    }
`;

const PageTitleLink = styled.div`
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${(props: any): string => props.theme.sizes.large1};
    line-height: ${(props: any): string => props.theme.sizes.large3};
    color: ${(props: any): string => props.theme.colors.text};
    cursor: pointer;
`;


const StyledTabs = styled(Tabs)`
    

    .css-1aquho2-MuiTabs-indicator {
        display: none;
    }
    

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
            /* border: 1px solid red !important; */
            padding: 0px 60px !important;
            /* border-radius: 8px !important; */
            background-color: ${(props) => props.theme.colors.primary};
            /* margin-right: 2px; */
        }
    }
`;

const StyledTab = styled(Tab)`
    
    font-family: WorkSans Light !important;
    font-size: 20px !important;
    color: ${props => props.theme.colors.text} !important;
    text-transform: none !important;

    
    
`;

export {
    Container,
    PageTitleLink,
    StyledTabs,
    StyledTab,
    HeaderButtons
}