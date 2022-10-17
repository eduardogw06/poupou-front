import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import QuestionText from "../../components/common/QuestionText/QuestionText";
import { Container, FormContainer } from "./Register.styles";

const Register = (): JSX.Element => {
  return (
    <Container>
      <Logo showImage={true} imageSide="bottom" />
      <FormContainer>
        <Input
          id="name"
          label="Nome"
          type="text"
          variant="outlined"
          size="small"
          autocomplete="off"
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          size="small"
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
        />
        <Input
          id="confirmPassword"
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          size="small"
        />

        <Button text="Cadastrar" size="medium" fullWidth={true} />
        <Button
          text="Fazer login com o Google"
          size="medium"
          fullWidth={true}
          outlined={true}
        />

        <QuestionText
          text="Já tem uma conta?"
          linkText="Faça seu login"
          href="/login"
        />
      </FormContainer>
    </Container>
  );
};

export default Register;
