import styled from "styled-components";

const Container = styled.div<{ menuOpened: boolean }>`
    width: 100vw;
    height: 100vh;
    padding: ${(props: any): string => `${props.theme.sizes.large3} ${props.theme.sizes.large4}`} ;
    display: ${(props: any): string => props.menuOpened ? "none" : "flex"};

    @media(${(props: any): string => props.theme.media.md}) {
        width: 100vw;
        height: calc(100vh + 22px);
        display: flex;
        margin: ${(props: any): string => !props.menuOpened ?
        `${props.theme.sizes.large4} ${props.theme.sizes.xlarge1}` : `${props.theme.sizes.large4} ${props.theme.sizes.none} ${props.theme.sizes.none} ${props.theme.sizes.none}`
    };
        background: ${(props: any): string => props.theme.colors.secondary}
    }
    `

export { Container }