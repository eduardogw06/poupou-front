import { getSession, signOut } from "next-auth/react";
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
import { updatePassword } from "../../services/updatePassword";
import { IAlertProps } from "../../types/IAlertProps";
import { IApiResponse } from "../../types/IApiResponse";
import { IUpdatePasswordPayload } from "../../types/IUpdatePasswordPayload";

interface IError {
  hasError: boolean;
  message: string;
}

const defaultValues: IUpdatePasswordPayload = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Senha alterada com sucesso!",
};

const UpdatePassword = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("oldPassword");
    register("newPassword");
    register("newPasswordConfirm");
  }, [register]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);

  const handleFeedbackClose = () => {
    signOut({ callbackUrl: "/login" });
  };

  const onSubmit = async (data: IUpdatePasswordPayload) => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const result = (await updatePassword(
      data,
      session.user.jwt
    )) as IApiResponse;

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
            id="oldPassword"
            label="Senha"
            type="password"
            variant="outlined"
            size="medium"
            value={watch("oldPassword")}
            fullWidth={true}
            onChange={(e: any): void => setValue("oldPassword", e.target.value)}
            error={error.hasError}
          />
          <Input
            id="newPassword"
            label="Nova Senha"
            type="password"
            variant="outlined"
            size="medium"
            value={watch("newPassword")}
            fullWidth={true}
            onChange={(e: any): void => setValue("newPassword", e.target.value)}
            error={error.hasError}
          />

          <Input
            id="newPasswordConfirm"
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            size="medium"
            value={watch("newPasswordConfirm")}
            fullWidth={true}
            onChange={(e: any): void =>
              setValue("newPasswordConfirm", e.target.value)
            }
            error={error.hasError}
            helperText={error.message}
          />

          <Button
            type="submit"
            text="Alterar Senha"
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

export default UpdatePassword;
