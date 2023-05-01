import { MenuItem } from "@mui/material";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editTransaction } from "../../../../services/editTransaction";
import { newTransaction } from "../../../../services/newTransaction";
import { IAlertProps } from "../../../../types/IAlertProps";
import { IApiResponse } from "../../../../types/IApiResponse";
import { IError } from "../../../../types/IError";
import { IGetTarget } from "../../../../types/IGetTarget";
import { INewTransactionPayload } from "../../../../types/INewTransactionPayload";
import { ModalType } from "../../../../types/ModalType";
import { transactionsValidate } from "../../../../utils/validations/transactions";
import Input from "../../../common/Input/Input";
import InputMoney from "../../../common/InputMoney/InputMoney";
import { FormContainer } from "./TransactionModal.styles";
import { IGetTransaction } from "../../../../types/IGetTransaction";

interface TransactionModalProps {
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
  amount: 0,
  target_id: "",
  type: "Aporte",
  date: new Date(),
};

const TransactionModal = ({
  type,
  modalData,
  targets,
  setButtonDisabled,
  setIsLoading,
  setFeedbackOpened,
  setAlertProps,
  setModalOpened,
}: TransactionModalProps): JSX.Element => {
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

    const errors = transactionsValidate(data);

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
      setValue("amount", Number(modalData.amount));
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
        onChange={(e: any): void => setValue("amount", Number(e.target.value))}
        error={error.hasError}
        helperText={error.message}
      />
    </FormContainer>
  );
};

export default TransactionModal;
