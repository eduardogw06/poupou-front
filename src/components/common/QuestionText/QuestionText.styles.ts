import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding-top: 24px;
`;

const NormalText = styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    color: #8B8BAB;
    margin-right: 12px;
`
const LinkText = styled.p`
    font-family: 'Circular Std';
    font-style: bold;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    color: #FFFFFF;
     cursor: pointer;
`

export { Container, NormalText, LinkText }