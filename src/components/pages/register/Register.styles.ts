import styled from "styled-components";

const Container = styled.div`
    padding: ${(props: any) => {
        const sizes = props.theme.sizes;

        return `${sizes.medium4} ${sizes.none} ${sizes.none} ${sizes.none}`;
    }};

    display: flex;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding: ${(props: any) => {
        const sizes = props.theme.sizes;

        return `${sizes.none} ${sizes.none}  ${sizes.none} ${sizes.none}`;
    }};

    & > .input {
        margin-top: 16px;
    }

    @media (${(props) => props.theme.media.md}) {
        width: 300px
    
    };
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    & > :nth-child(2) {
        margin-top: 16px;
    }
`;

export { Container, FormContainer, ButtonContainer };
