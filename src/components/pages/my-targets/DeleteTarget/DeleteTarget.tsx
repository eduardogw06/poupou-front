import { useState } from "react";
import { IGetTarget } from "../../../../types/IGetTarget";
import { IError } from "../../../../types/IError";
import Dialog from "../../../common/Dialog/Dialog";
import Button from "../../../common/Button/Button";
import { isMobile } from "../../../../utils/isMobile";
import DeleteTargetModal from "./DeleteTargetModal";
import Feedback from "../../../common/Feedback/Feedback";
import Router from "next/router";
import { getSession } from "next-auth/react";
import { IAlertProps } from "../../../../types/IAlertProps";
import { deleteTarget as deleteTargetService } from "../../../../services/deleteTarget";

interface DeleteTargetProps {
  deleteTargetData: IGetTarget;
  deleteModalOpened: boolean;
  setDeleteModalOpened: (boolean) => void;
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Objetivo excluído com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const DeleteTarget = ({
  deleteTargetData,
  deleteModalOpened,
  setDeleteModalOpened,
}: DeleteTargetProps): JSX.Element => {
  const mobile = isMobile();
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleFeedbackClose = () => {
    setDeleteModalOpened(false);
    Router.reload();
  };

  const deleteTarget = async (data: { target_id: string }): Promise<void> => {
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const response = await deleteTargetService(data, session?.user.jwt);

    if (response && response.success) {
      setFeedbackOpened(true);
    } else {
      setError({
        hasError: true,
        message: response.message,
      });
    }
  };

  const DialogButtons = (
    <>
      <Button
        type="button"
        size={mobile ? "medium" : "small"}
        text="Não"
        outlined
        onClick={(): void => setDeleteModalOpened(false)}
      />
      <Button
        type="submit"
        form="deleteTargetForm"
        size={mobile ? "medium" : "small"}
        text="Confirmar"
        loading={isLoading}
        disabled={buttonDisabled}
      />
    </>
  );

  return (
    <>
      {deleteTargetData && (
        <>
          <Dialog
            isOpen={deleteModalOpened}
            title="Deseja realmente remover este objetivo?"
            handleClose={(): void => setDeleteModalOpened(false)}
            buttons={DialogButtons}
          >
            <DeleteTargetModal
              data={deleteTargetData}
              onSubmit={deleteTarget}
              error={error}
            />
          </Dialog>

          <Feedback
            feedbackOpened={feedbackOpened}
            alertProps={defaultAlert}
            handleClose={handleFeedbackClose}
          />
        </>
      )}
    </>
  );
};

export default DeleteTarget;
