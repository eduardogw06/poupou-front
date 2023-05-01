import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    > div {
        &:first-child div{
            margin-top: ${props => props.theme.sizes.none};
        }
        
        margin-top: ${props => props.theme.sizes.medium3};
    }
`

export {
    FormContainer
};
