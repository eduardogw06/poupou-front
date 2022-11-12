import { Alert, Snackbar } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  FormContainer,
  InputContainer,
} from "../../components/pages/update-password/UpdatePassword.styles";
import { updatePassword } from "../../services/updatePassword";
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

  const handleClose = () => {
    localStorage.removeItem("sessionToken");
    Router.reload();
  };

  const onSubmit = async (data: IUpdatePasswordPayload) => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const result = (await updatePassword(data)) as IApiResponse;

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
            label="Confirmar Senha"
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

      <Snackbar
        open={feedbackOpened}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Senha alterada com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UpdatePassword;
