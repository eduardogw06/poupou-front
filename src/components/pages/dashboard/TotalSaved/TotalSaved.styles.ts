import styled from "styled-components";

const Container = styled.div``;

const ContentText = styled.p`
    font-family: 'Circular Std';
    font-weight: bold;
    font-size: ${props => props.theme.sizes.medium3};
    line-height: ${props => props.theme.sizes.large1};
    color: #FFFFFF;
    cursor: pointer;
`;

export { Container, ContentText }