import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
    margin-top: ${(props: any): string => props.theme.sizes.medium2};
`
export { StyledTextField }

