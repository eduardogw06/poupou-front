import styled from "styled-components";

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100vw - 104px);
    height: fit-content;
    margin-bottom: ${(props: any): string => props.theme.sizes.medium4};
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${(props: any): string => props.theme.sizes.large1};
    line-height: ${(props: any): string => props.theme.sizes.large3};
    color: ${(props: any): string => props.theme.colors.text};   

    @media (${(props: any): string => props.theme.media.md}) {
        width: 100%;
        flex-direction: row;
    }
`;

export { Title }