import { SignInResponse, signIn } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Feedback from "../../components/common/Feedback/Feedback";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import QuestionText from "../../components/common/QuestionText/QuestionText";
import {
  ButtonContainer,
  Container,
  FormContainer,
} from "../../components/pages/register/Register.styles";
import { userRegister } from "../../services/userRegister";
import { IAlertProps } from "../../types/IAlertProps";
import { IApiResponse } from "../../types/IApiResponse";
import { IRegisterPayload } from "../../types/IRegisterPayload";

interface IError {
  hasError: boolean;
  message: string;
}

const defaultValues: IRegisterPayload = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message:
    "Cadastro realizado com sucesso! Faça seu login e comece já a poupar",
};

const Register = (): JSX.Element => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("name");
    register("email");
    register("password");
    register("confirmPassword");
  }, [register]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);

  const handleFeedbackClose = (): void => {
    Router.push("/login");
  };

  const onSubmit = async (data: IRegisterPayload) => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const result = (await userRegister(data)) as IApiResponse;
    if (result.success) {
      setIsLoading(false);
      setButtonDisabled(false);
      setFeedbackOpened(true);
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
          id="name"
          label="Nome"
          type="text"
          variant="outlined"
          size="small"
          autoComplete="off"
          value={watch("name")}
          onChange={(e: any): void => setValue("name", e.target.value)}
          error={error.hasError}
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          variant="outlined"
          size="small"
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
        />
        <Input
          id="confirmPassword"
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          size="small"
          value={watch("confirmPassword")}
          onChange={(e: any): void =>
            setValue("confirmPassword", e.target.value)
          }
          error={error.hasError}
          helperText={error.message}
        />

        <ButtonContainer>
          <Button
            type="submit"
            text="Cadastrar"
            size="medium"
            fullWidth={true}
            loading={isLoading}
            disabled={buttonDisabled}
          />
          <Button
            text="Registre-se com o Google"
            size="medium"
            fullWidth={true}
            outlined={true}
            onClick={(): Promise<SignInResponse> =>
              signIn("google", {
                redirect: false,
                callbackUrl: process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL,
              })
            }
          />
        </ButtonContainer>

        <QuestionText
          text="Já tem uma conta?"
          linkText="Faça seu login"
          href="/login"
        />

        <Feedback
          feedbackOpened={feedbackOpened}
          alertProps={defaultAlert}
          handleClose={handleFeedbackClose}
        />
      </FormContainer>
    </Container>
  );
};

Register.displayName = "Register";

export default Register;
