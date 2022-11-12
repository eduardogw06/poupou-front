import styled from "styled-components";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    

    > div {
        &:first-child div{
            margin-top: 0px;
        }
        
        margin-top: 24px;
    }
`

export {
    FormContainer
};
