import { darken } from "polished";
import styled from "styled-components";

const Container = styled.div`
    background: ${(props: any): string => darken(0.03, props.theme.colors.primary)};
    display: flex;
    flex-direction: column;
    position: relative;
    height: calc(100vh - 150px);
    width: 100vw;

    @media (${(props: any): string => props.theme.media.md}) {
        max-width: 25%;
        height: calc(100vh + 70px);
    }
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 50px;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 48px;

    @media (${(props: any): string => props.theme.media.md}) {
        padding: 12px 16px;
    }

`;

const MenuItemName = styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: ${(props: any): string => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {
        font-size: 12px;
    }
`;

export { Container, IconContainer, MenuItem, MenuItemName }