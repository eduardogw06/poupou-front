import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100vw - ${props => props.theme.sizes.large4});

    @media (${(props: any): string => props.theme.media.md}) {
        width: 100%;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 56px);

    > div {
        &:first-child {
            margin-top: ${props => props.theme.sizes.none};
        }
        
        margin-top: ${props => props.theme.sizes.medium3};
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