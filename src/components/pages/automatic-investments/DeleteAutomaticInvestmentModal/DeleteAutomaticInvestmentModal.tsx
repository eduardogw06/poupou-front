import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IError } from "../../../../types/IError";
import { IGetAutomaticInvestments } from "../../../../types/IGetAutomaticInvestments";
import { numberToReal } from "../../../../utils/numberToReal";
import {
  AlertRow,
  DeleteAutomaticInvestmentForm,
  DeleteModalLabel,
  DeleteModalRow,
  DeleteModalText,
} from "./DeleteAutomaticInvestmentModal.styles";

interface IDeleteTransactionModalProps {
  data: IGetAutomaticInvestments;
  onSubmit: (data: IDefaultValue) => void;
  error: IError;
}

interface IDefaultValue {
  automatic_investment_id: string;
}

const defaultValues: IDefaultValue = {
  automatic_investment_id: "",
};

const DeleteAutomaticInvestmentModal = ({
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
    register("automatic_investment_id");

    if (data) {
      setValue("automatic_investment_id", data.uuid);
    } else {
      reset();
    }
  }, [register]);

  return (
    <DeleteAutomaticInvestmentForm
      id="deleteAutomaticInvestmentForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DeleteModalRow>
        <DeleteModalLabel>Objetivo:</DeleteModalLabel>
        <DeleteModalText>{data.target.description}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Valor do aporte automático:</DeleteModalLabel>
        <DeleteModalText>{numberToReal(Number(data.amount))}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Data do aporte:</DeleteModalLabel>
        <DeleteModalText>Todo dia {data.day} de cada mês</DeleteModalText>
      </DeleteModalRow>

      {error.hasError && (
        <AlertRow>
          <Alert severity="error">{error.message}</Alert>
        </AlertRow>
      )}
    </DeleteAutomaticInvestmentForm>
  );
};

export default DeleteAutomaticInvestmentModal;
