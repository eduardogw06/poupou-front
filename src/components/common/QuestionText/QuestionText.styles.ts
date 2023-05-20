import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: ${(props: any): string => props.theme.sizes.small3};
    margin-top: ${(props: any): string => props.theme.sizes.small3};
`;

const NormalText = styled.p`
    font-family: 'Circular Medium';
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.theme.sizes.small3};
    line-height: ${props => props.theme.sizes.medium3};
    color: #8B8BAB;
    margin-right: ${props => props.theme.sizes.small3};
`
const LinkText = styled.p`
    font-family: 'Circular Medium';
    font-style: bold;
    font-weight: 400;
    font-size: ${props => props.theme.sizes.small3};
    line-height: ${props => props.theme.sizes.medium3};
    color: #FFFFFF;
     cursor: pointer;
`

export { Container, NormalText, LinkText }