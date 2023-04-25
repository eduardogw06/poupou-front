import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormHandleSubmit, useForm } from "react-hook-form";
import { IGetTarget } from "../../../../types/IGetTarget";
import { INewTransactionPayload } from "../../../../types/INewTransactionPayload";
import Input from "../../../common/Input/Input";
import InputMoney from "../../../common/InputMoney/InputMoney";
import { FormContainer } from "./NewTransactionModal.styles";
import { newTransaction } from "../../../../services/newTransaction";
import { getSession } from "next-auth/react";
import { IApiResponse } from "../../../../types/IApiResponse";
import { IAlertProps } from "../../../../types/IAlertProps";
import { IError } from "../../../../types/IError";
import { ModalType } from "../../../../types/ModalType";
import { editTransaction } from "../../../../services/editTransaction";

interface NewTransactionModalProps {
  type: ModalType;
  modalData: IGetTransaction | null;
  setButtonDisabled: (boolean) => void;
  setIsLoading: (boolean) => void;
  setFeedbackOpened: (boolean) => void;
  setAlertProps: (boolean) => void;
  setModalOpened: (boolean) => void;
  targets: IGetTarget[];
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte atualizado com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultValues: INewTransactionPayload = {
  transaction_id: "",
  amount: "",
  target_id: "",
  type_id: "3425bac3-2025-4284-83d7-72e85dbcabc9",
  date: new Date(),
};

const NewTransactionModal = ({
  type,
  modalData,
  targets,
  setButtonDisabled,
  setIsLoading,
  setFeedbackOpened,
  setAlertProps,
  setModalOpened,
}: NewTransactionModalProps): JSX.Element => {
  const [error, setError] = useState<IError>(defaultError);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data: INewTransactionPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const onSubmitFunction =
      type === "create" ? newTransaction : editTransaction;
    const result = (await onSubmitFunction(
      data,
      session.user.jwt
    )) as IApiResponse;

    if (result.success) {
      setAlertProps(defaultAlert);
      setFeedbackOpened(true);
      setModalOpened(false);
    } else {
      setError({
        hasError: true,
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    register("target_id");
    register("amount");
    register("transaction_id");

    if (modalData) {
      setValue("target_id", modalData.target.uuid);
      setValue("amount", modalData.amount);
      setValue("transaction_id", modalData.uuid);
    } else {
      reset();
    }
  }, [register]);

  return (
    <FormContainer
      id={type === "create" ? "newTransactionForm" : "editTransactionForm"}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" id="transaction_id" value={modalData?.uuid} />
      <Input
        id="name"
        label="Objetivo"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("target_id")}
        select
        onChange={(e: any): void => setValue("target_id", e.target.value)}
        error={error.hasError}
      >
        {targets &&
          targets.map(
            (target: IGetTarget): JSX.Element => (
              <MenuItem key={target.uuid} value={target.uuid}>
                {target.description}
              </MenuItem>
            )
          )}
      </Input>

      <InputMoney
        id="amount"
        label="Valor do aporte"
        type="text"
        variant="outlined"
        size="small"
        value={watch("amount")}
        onChange={(e: any): void => setValue("amount", e.target.value)}
        error={error.hasError}
        helperText={error.message}
      />
    </FormContainer>
  );
};

export default NewTransactionModal;
