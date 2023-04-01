import { getCsrfToken, getSession, signIn } from "next-auth/react";
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
import { ILoginPayload } from "../../types/ILoginPayload";

const defaultValues: ILoginPayload = {
  email: "",
  password: "",
};

interface IError {
  hasError: boolean;
  message: string;
}

function Login({ providers: any }): JSX.Element {
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

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result.error) {
      setError({
        hasError: true,
        message: result.error,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }

    setIsLoading(false);
    setButtonDisabled(false);

    Router.push("/dashboard");
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

        <Link href="#">
          <PasswordRecovery>Recuperar senha</PasswordRecovery>
        </Link>

        <Button
          type="submit"
          text="Login"
          size="medium"
          fullWidth={true}
          loading={isLoading}
          disabled={buttonDisabled}
        />

        <Button
          text="Fazer login com o Google"
          size="medium"
          fullWidth={true}
          outlined={true}
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl: "http://localhost:8080/dashboard",
            })
          }
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

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      csrfToken: (await getCsrfToken(context)) ?? null,
    },
  };
}

export default Login;
