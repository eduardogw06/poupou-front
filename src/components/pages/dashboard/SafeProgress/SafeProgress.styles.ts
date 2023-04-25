import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const SeeMore = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: ${props => props.theme.sizes.medium3};
    padding-bottom: ${props => props.theme.sizes.large2};
    font-family: 'Circular Medium';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium1};
    line-height: ${props => props.theme.sizes.small3};
    color: ${(props: any): string => props.theme.colors.text};
    cursor: pointer;
`;

export { Container, SeeMore }