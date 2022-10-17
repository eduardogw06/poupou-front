import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { StyledTextField } from "./Input.styles";

const Input = ({ ...props }): JSX.Element => {
  return (
    <>
      <StyledTextField {...props}></StyledTextField>
    </>
  );
};

export default Input;
