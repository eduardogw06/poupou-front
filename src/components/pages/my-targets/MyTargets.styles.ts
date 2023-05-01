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

const CardsContainer = styled.div`
    display: flex;
   
    flex-direction: column;
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    width: calc(100vw - 144px);

    & > div {
        margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
    }

    @media (${(props: any): string => props.theme.media.md}) {
        width: calc(100vw - 96px);
        flex-direction: column;
        flex-wrap: wrap;
    
        grid-auto-rows: auto;
        flex-direction: row;
        width: calc(100vw - 216px);
        margin-top: ${(props: any): string => props.theme.sizes.medium2};

        & > :nth-child(odd) {
            margin-right: 4%;
            flex-basis: 48%;
        }

        & > :nth-child(even) {
            flex-basis: 48%;
        }

    }
`;

export { Container, CardsContainer };