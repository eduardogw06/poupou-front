import styled from "styled-components";

const Title = styled.h1`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: fit-content;
    margin-bottom: 28px; ;
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: ${(props: any): string => props.theme.colors.text};
`;

export { Title }