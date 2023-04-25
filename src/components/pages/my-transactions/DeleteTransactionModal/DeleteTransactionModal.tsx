import { ptBR } from "date-fns/locale";
import {
  AlertRow,
  DeleteModalLabel,
  DeleteModalRow,
  DeleteModalText,
  DeleteTransactionForm,
} from "./DeleteTransaction.styles";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IError } from "../../../../types/IError";
import { Alert } from "@mui/material";

interface IDeleteTransactionModalProps {
  data: IGetTransaction;
  onSubmit: (data: IDefaultValue) => void;
  error: IError;
}

interface IDefaultValue {
  transaction_id: string;
}

const defaultValues: IDefaultValue = {
  transaction_id: "",
};

const DeleteTransactionModal = ({
  data,
  onSubmit,
  error,
}: IDeleteTransactionModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("transaction_id");

    if (data) {
      setValue("transaction_id", data.uuid);
    } else {
      reset();
    }
  }, [register]);

  return (
    <DeleteTransactionForm
      id="deleteTransactionForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DeleteModalRow>
        <DeleteModalLabel>Objetivo:</DeleteModalLabel>
        <DeleteModalText>{data.target.description}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Valor do aporte:</DeleteModalLabel>
        <DeleteModalText>
          {Number(data.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Data do aporte:</DeleteModalLabel>
        <DeleteModalText>
          {format(new Date(data.date), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </DeleteModalText>
      </DeleteModalRow>

      {error.hasError && (
        <AlertRow>
          <Alert severity="error">{error.message}</Alert>
        </AlertRow>
      )}
    </DeleteTransactionForm>
  );
};

export default DeleteTransactionModal;