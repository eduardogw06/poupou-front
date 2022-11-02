import styled from "styled-components";

const Title = styled.h1`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;

    color: ${(props: any): string => props.theme.colors.text};
`;

export { Title }