import { DatePicker } from "@mui/x-date-pickers";
import { rgba } from "polished";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
    background: ${rgba(255, 255, 255, 0.05)};
    border-radius: 4px;
    
    > label {
        top: -8px;
    }
    > div > input {
        padding: 8px 14px;
        color: ${(props: any): string => props.theme.colors.text}  !important;
    }

    > div > div > button {
         color: #8B8BAB;
    }

    & > label {
        color: #8B8BAB;
    }

    .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
         &:hover {
            > fieldset {
                border: 2px #8B8BAB;
            }
        }
    }

    
    .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: #8B8BAB;
    }

    .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
        border-color: #8B8BAB;
        border-width: 2px;
    }
`;

export {
    StyledDatePicker
}