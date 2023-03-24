import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
    }
`;

const TotalSavedContainer = styled.div`
    display: flex;
    width: calc(100vw - 96px);

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
    }
`;

const SafeProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    width: calc(100vw - 96px);

    & > div {
        margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
    }

    @media (${(props: any): string => props.theme.media.md}) {
        flex-direction: row;
        width: calc(100vw - 216px);
        margin-top: ${(props: any): string => props.theme.sizes.medium2};

        & > :nth-child(odd) {
            margin-right: ${(props: any): string => props.theme.sizes.large2};
        }

    }
`;

const MySafesProgressContainer = styled.div`
    display: flex;
    width: calc(100vw - 96px);
    height: 100%;

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
    }
`;

export {
    Container,
    TotalSavedContainer,
    SafeProgressContainer,
    MySafesProgressContainer
}