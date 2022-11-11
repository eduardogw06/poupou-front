import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import QuestionText from "../../components/common/QuestionText/QuestionText";
import {
  Container,
  FormContainer,
  PasswordRecovery,
} from "../../components/pages/login/Login.styles";
import { login } from "../../services/login";
import { ILoginPayload } from "../../types/ILoginPayload";
import { IApiResponse } from "../../types/IApiResponse";

const defaultValues: ILoginPayload = {
  email: "",
  password: "",
};

interface IError {
  hasError: boolean;
  message: string;
}

function Login(): JSX.Element {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const defaultError: IError = {
    hasError: false,
    message: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const isComingSoon = true;

  const onSubmit = async (data: ILoginPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const result = (await login(data)) as IApiResponse;

    if (result.success) {
      setIsLoading(false);
      setButtonDisabled(false);

      Router.push("/dashboard");
    } else {
      setError({
        hasError: true,
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <Logo showImage={true} imageSide="bottom" />
      <FormContainer method="post" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          size="small"
          autoComplete="off"
          value={watch("email")}
          onChange={(e: any): void => setValue("email", e.target.value)}
          error={error.hasError}
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          value={watch("password")}
          onChange={(e: any): void => setValue("password", e.target.value)}
          error={error.hasError}
          helperText={error.message}
        />

        {!isComingSoon && (
          <Link href="#">
            <PasswordRecovery>Recuperar senha</PasswordRecovery>
          </Link>
        )}

        <Button
          type="submit"
          text="Login"
          size="medium"
          fullWidth={true}
          loading={isLoading}
          disabled={buttonDisabled}
        />

        {!isComingSoon && (
          <Button
            text="Fazer login com o Google"
            size="medium"
            fullWidth={true}
            outlined={true}
          />
        )}

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
