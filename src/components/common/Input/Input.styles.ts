import { TextField } from "@mui/material";
import { rgba } from "polished";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
    
     > div > input {
        background: ${rgba(255, 255, 255, 0.05)};
        color: ${(props: any): string => props.theme.colors.text}  !important;
        border-radius: 4px;
     }

    > div  {
        &:hover {
            > fieldset {
                border: 1px solid #8B8BAB !important;
            }

        }

        > .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input{
            color: ${props => props.theme.colors.text};
            background-color: ${rgba(255, 255, 255, 0.05)};
        }

        > svg {
            color: #8B8BAB;
        }
     }

    > label {
        color: #8B8BAB;
    }

    .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: #8B8BAB
    }

    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #8B8BAB;
        border-width: 2px;
    }
`
export { StyledTextField }

