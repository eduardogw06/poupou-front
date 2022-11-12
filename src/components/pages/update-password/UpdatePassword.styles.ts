import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 50%;

    > * {
        &:first-child {
            margin-top: 0px;
        }
        
        margin-top: 24px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row ;
    align-content: center;
    justify-content: center;
`;

export {
    InputContainer,
    FormContainer,
    Container
}