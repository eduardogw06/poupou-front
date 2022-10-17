import { StyledButton } from "./Button.styles";

interface ButtonProps {
  text: string;
  size: "small" | "medium" | "large";
  fullWidth?: boolean;
  outlined?: boolean;
}

const Button = ({
  text,
  size,
  fullWidth = false,
  outlined = false,
}: ButtonProps): JSX.Element => {
  return (
    <>
      <StyledButton size={size} fullWidth={fullWidth} outlined={outlined}>
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
