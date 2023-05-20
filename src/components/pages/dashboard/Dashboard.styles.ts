import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;

    & > :first-child {
        width: calc(100vw - 56px)
    }

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
        padding: ${(props: any): string => props.menuOpened ? `${props.theme.sizes.none}  ${props.theme.sizes.large3} ${props.theme.sizes.none} ${props.theme.sizes.large3}` : `${props.theme.sizes.large3} ${props.theme.sizes.large4}`} ;
        & > :first-child {
            width: calc(100vw - 128px);
        }
    }
`;

const TotalSavedContainer = styled.div`
    display: flex;
    width: calc(100vw - 56px);
    & > div {
        width: 100%;
    }

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
    }
`;

const SafeProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    width: calc(100vw - 56px);

    

    & > div {
        margin-bottom: ${(props: any): string => props.theme.sizes.medium2};
         width: 100%;
    }

    @media (${(props: any): string => props.theme.media.md}) {
        flex-direction: row;
        width: calc(100vw - 216px);
        margin-top: ${(props: any): string => props.theme.sizes.medium2};
        flex-wrap: wrap;

        & > :nth-child(odd) {
            margin-right: 6%;
            flex-basis: 42%;
        }

        & > :nth-child(even) {
            flex-basis: 42%;
        }

        .seeMore {
            flex-basis: 90%;
        }

    }
`;

const SeeMoreTargetsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const MySafesProgressContainer = styled.div`
    display: flex;
    width: calc(100vw - 56px);
    height: 100%;

    & > div {
        width: 100%;
        max-height: 100%;
    }

    @media (${(props) => props.theme.media.md}) {
        width: calc(100vw - 216px);
    }
`;

export {
    Container,
    SeeMoreTargetsContainer,
    TotalSavedContainer,
    SafeProgressContainer,
    MySafesProgressContainer
}