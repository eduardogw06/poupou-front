import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 48px);

    @media (${(props: any): string => props.theme.media.md}) {
        width: 100%;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 96px);

    > div {
        &:first-child {
            margin-top: 0px;
        }
        
        margin-top: 24px;
    }

    @media (${(props: any): string => props.theme.media.md}) {
        width: 50%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    @media (${(props: any): string => props.theme.media.md}) {
        flex-direction: row;
    }
`;

export {
    InputContainer,
    FormContainer,
    Container
}