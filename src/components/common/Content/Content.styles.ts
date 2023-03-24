import styled from "styled-components";

const Container = styled.div<{ menuOpened: boolean }>`
    width: 100vw;
    padding: ${(props: any): string => `${props.theme.sizes.large3} ${props.theme.sizes.large4}`} ;
    display: ${(props: any): string => props.menuOpened ? "none" : "flex"};

    @media(${(props: any): string => props.theme.media.md}) {
        width: 77vw;
        height: fit-content;
        display: flex;
        padding: ${(props: any): string => props.menuOpened ? `${props.theme.sizes.none}  ${props.theme.sizes.large3} ${props.theme.sizes.none} ${props.theme.sizes.large3}` : `${props.theme.sizes.large3} ${props.theme.sizes.large4}`} ;
        margin: ${(props: any): string => props.menuOpened ?
        `${props.theme.sizes.large4} ${props.theme.sizes.none} ${props.theme.sizes.large4} ${props.theme.sizes.none}` : `${props.theme.sizes.none} ${props.theme.sizes.xlarge1} ${props.theme.sizes.large4} ${props.theme.sizes.xlarge1}`
    };
        background: ${(props: any): string => props.theme.colors.primary};
    }
`

export { Container }