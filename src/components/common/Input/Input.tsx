import { StyledTextField } from "./Input.styles";

const Input = ({ ...props }): JSX.Element => {
  return (
    <>
      <StyledTextField {...props}></StyledTextField>
    </>
  );
};

export default Input;
