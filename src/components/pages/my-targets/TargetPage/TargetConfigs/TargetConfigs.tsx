import { useEffect, useState } from "react";
import { IAlertProps } from "../../../../../types/IAlertProps";
import { INewTargetPayload } from "../../../../../types/INewTargetPayload";
import NewTargetModal from "../../NewTargetModal/NewTargetModal";
import { isMobile } from "../../../../../utils/isMobile";
import { IError } from "../../../../../types/IError";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { getSession } from "next-auth/react";
import { IApiResponse } from "../../../../../types/IApiResponse";
import { newTarget } from "../../../../../services/newTarget";
import { editTarget } from "../../../../../services/editTarget";
import Button from "../../../../common/Button/Button";
import { ButtonContainer, Container } from "./TargetConfigs.styles";
import Feedback from "../../../../common/Feedback/Feedback";
import { getTargets as getTargetsService } from "../../../../../services/getTargets";
import { IGetTarget } from "../../../../../types/IGetTarget";

const defaultValues: INewTargetPayload = {
  description: "",
  category_id: "",
  user_id: "",
  target_amount: "",
  date_begin: null,
  date_end: null,
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Objetivo cadastrado com sucesso!",
};

interface TargetConfigsProps {
  targetData: IGetTarget[];
}

const TargetConfigs = ({ targetData }: TargetConfigsProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [error, setError] = useState<IError>(defaultError);
  const mobile = isMobile();
  const type = "edit";

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  const handleClose = () => {
    Router.reload();
  };

  const onSubmit = async (data: INewTargetPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    data.user_id = session.user.id;
    const result = (await editTarget(data, session.user.jwt)) as IApiResponse;

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
      <NewTargetModal
        setValue={setValue}
        watch={watch}
        error={error}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        type="edit"
        data={targetData}
        button={
          <ButtonContainer>
            <Button
              type="submit"
              form="editTargetForm"
              size={mobile ? "medium" : "small"}
              text="Editar"
              loading={isLoading}
              disabled={buttonDisabled}
            />
          </ButtonContainer>
        }
      ></NewTargetModal>

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default TargetConfigs;
