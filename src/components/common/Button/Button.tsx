import { CircularProgress } from "@mui/material";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../../types/DefaultTheme";
import { StyledButton, ButtonContainer } from "./Button.styles";

interface ButtonProps {
  text: string;
  size: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  outlined?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  form?: string;
}

const Button = ({
  type = "button",
  text,
  size,
  fullWidth = false,
  outlined = false,
  loading = false,
  disabled = false,
  onClick,
  form,
}: ButtonProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const { tertiary } = theme.colors;

  return (
    <>
      <ButtonContainer>
        <StyledButton
          type={type}
          size={size}
          fullWidth={fullWidth}
          outlined={outlined}
          disabled={disabled}
          onClick={onClick}
          form={form}
        >
          {text}
        </StyledButton>
        {loading && (
          <CircularProgress
            size={30}
            sx={{
              color: tertiary,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-24px",
              marginLeft: "-12px",
            }}
          />
        )}
      </ButtonContainer>
    </>
  );
};

export default Button;
