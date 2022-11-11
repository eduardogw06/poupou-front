import styled from "styled-components";

const Container = styled.div`
    padding: ${(props: any) => {
        const sizes = props.theme.sizes;

        return `${sizes.medium4} ${sizes.none} ${sizes.medium4} ${sizes.none}`;
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

        return `${sizes.large3} ${sizes.none}  ${sizes.large3} ${sizes.none}`;
    }};

    @media (${(props) => props.theme.media.md}) {
        width: 300px
    
    };
    
    > div {
    margin-bottom: 20px;
    }
`;

export { Container, FormContainer };
