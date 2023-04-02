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
        height: calc(100vh + ${props => props.theme.sizes.xlarge2});
    }
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${props => props.theme.sizes.large4};
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${props => `${props.theme.sizes.medium3} ${props.theme.sizes.medium4}`};

    @media (${(props: any): string => props.theme.media.md}) {
        padding: ${props => `${props.theme.sizes.small3} ${props.theme.sizes.medium1}`};
    }

`;

const MenuItemName = styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium1};
    line-height: ${props => props.theme.sizes.medium2};
    color: ${(props: any): string => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {
        font-size: ${props => props.theme.sizes.small3};
        width: 20vw;
    }
`;

export { Container, IconContainer, MenuItem, MenuItemName }