import { rgba } from "polished";
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

     > div > div > input {
        background: ${rgba(255, 255, 255, 0.05)};
        color: #FFFFFF;
        border-radius: ${props => props.theme.sizes.small1}
     }

     > div > div  {
        &:hover {
            > fieldset {
                border: 1px solid #8B8BAB !important;
            }
            
        }
     }

     > div > label {
        color: #8B8BAB;
     }

     .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: #8B8BAB
     }

     .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #8B8BAB;
        border-width: 2px;
     }
`;

export { Container, FormContainer }