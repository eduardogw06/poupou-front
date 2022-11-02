import Link from "next/link";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import QuestionText from "../../components/common/QuestionText/QuestionText";
import {
  Container,
  FormContainer,
  PasswordRecovery,
} from "../../components/pages/login/Login.styles";

function Login(): JSX.Element {
  return (
    <Container>
      <Logo showImage={true} imageSide="bottom" />
      <FormContainer>
        <Input
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          size="small"
          autocomplete="off"
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
        />

        <Link href="#">
          <PasswordRecovery>Recuperar senha</PasswordRecovery>
        </Link>

        <Button text="Login" size="medium" fullWidth={true} />
        <Button
          text="Fazer login com o Google"
          size="medium"
          fullWidth={true}
          outlined={true}
        />

        <QuestionText
          text="Ainda não tem conta?"
          linkText="Cadastre-se já"
          href="/cadastro"
        />
      </FormContainer>
    </Container>
  );
}

Login.displayName = "Login";

export default Login;
