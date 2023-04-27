import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newTarget } from "../../../../services/newTarget";
import { IAlertProps } from "../../../../types/IAlertProps";
import { IApiResponse } from "../../../../types/IApiResponse";
import { INewTargetPayload } from "../../../../types/INewTargetPayload";
import { getFontAwesomeIcon } from "../../../../utils/getFontAwesomeIcon";
import { isMobile } from "../../../../utils/isMobile";
import Button from "../../../common/Button/Button";
import Dialog from "../../../common/Dialog/Dialog";
import Feedback from "../../../common/Feedback/Feedback";
import NewTargetModal from "../NewTargetModal/NewTargetModal";
import { Container } from "./CardNewTarget.styles";
import { IGetTarget } from "../../../../types/IGetTarget";
import { IError } from "../../../../types/IError";
import Router from "next/router";
import { targetsValidate } from "../../../../utils/validations/targets";

interface CardNewTarget {
  targets: IGetTarget[];
}

const defaultValues: INewTargetPayload = {
  description: "",
  category_id: "",
  user_id: "",
  target_amount: undefined,
  date_begin: undefined,
  date_end: undefined,
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Objetivo cadastrado com sucesso!",
};

const CardNewTarget = ({ targets }: CardNewTarget): JSX.Element => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [error, setError] = useState<IError>(defaultError);
  const mobile = isMobile();

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const handleClose = () => {
    setModalOpened(false);
    Router.reload();
  };

  const onSubmit = async (data: INewTargetPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const errors = targetsValidate(data);

    if (Object.keys(errors).length) {
      setError({
        hasError: true,
        message: Object.values(errors)[0],
      });
      setIsLoading(false);
      setButtonDisabled(false);
      return;
    }

    const session = await getSession();
    data.user_id = session.user.id;
    const result = (await newTarget(data, session.user.jwt)) as IApiResponse;

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

  const DialogButtons = (
    <Button
      type="submit"
      form="newTargetForm"
      size={mobile ? "medium" : "small"}
      text="Cadastrar"
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  return (
    <Container>
      <FontAwesomeIcon
        icon={getFontAwesomeIcon("circle-plus")}
        size={mobile ? "3x" : "4x"}
        color={"#FA58B6"}
        onClick={(): void => setModalOpened(!modalOpened)}
        style={{ cursor: "pointer" }}
      />

      <Dialog
        isOpen={modalOpened}
        title="Novo objetivo"
        handleClose={handleClose}
        buttons={DialogButtons}
      >
        <NewTargetModal
          setValue={setValue}
          watch={watch}
          error={error}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          type="create"
        ></NewTargetModal>
      </Dialog>

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default CardNewTarget;
