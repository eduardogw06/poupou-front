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

    @media (${(props) => props.theme.media.md}) {
        width: 300px
    
    };
`;

const ButtonContainer = styled.div`
    margin-top: ${props => props.theme.sizes.medium2};
`;

export { Container, FormContainer, ButtonContainer };
