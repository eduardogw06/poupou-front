import styled from "styled-components";

const Container = styled.div`
    margin-top: ${props => props.theme.sizes.medium3};
    width: calc(100vw - 284px);
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export {
    Container,
    ButtonContainer
}