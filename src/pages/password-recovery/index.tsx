import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Feedback from "../../components/common/Feedback/Feedback";
import Input from "../../components/common/Input/Input";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  FormContainer,
  InputContainer,
} from "../../components/pages/update-password/UpdatePassword.styles";
import { passwordRecovery } from "../../services/passwordRecovery";
import { IAlertProps } from "../../types/IAlertProps";
import { IApiResponse } from "../../types/IApiResponse";
import { IPasswordRecovery } from "../../types/IPasswordRecovery";

interface IError {
  hasError: boolean;
  message: string;
}

const defaultValues: IPasswordRecovery = {
  email: "",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Senha alterada com sucesso!",
};

const PasswordRecovery = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("email");
  }, [register]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);

  const handleFeedbackClose = (): void => {
    Router.push("/login");
  };

  const onSubmit = async (data: IPasswordRecovery): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const result = (await passwordRecovery(data)) as IApiResponse;

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
      <PageTitle>Alterar Senha</PageTitle>
      <InputContainer>
        <FormContainer method="post" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            size="medium"
            value={watch("email")}
            fullWidth={true}
            onChange={(e: any): void => setValue("email", e.target.value)}
            error={error.hasError}
            helperText={error.message}
          />

          <Button
            type="submit"
            text="Enviar"
            size="medium"
            fullWidth={true}
            loading={isLoading}
            disabled={buttonDisabled}
          />
        </FormContainer>
      </InputContainer>

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={defaultAlert}
        handleClose={handleFeedbackClose}
      />
    </Container>
  );
};

export default PasswordRecovery;
