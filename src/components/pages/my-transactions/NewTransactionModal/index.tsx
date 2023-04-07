import { MenuItem } from "@mui/material";
import { useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { IGetTarget } from "../../../../types/IGetTarget";
import { INewTransactionPayload } from "../../../../types/INewTransactionPayload";
import Input from "../../../common/Input/Input";
import InputMoney from "../../../common/InputMoney/InputMoney";
import { FormContainer } from "./NewTransactionModal.styles";

interface NewTransactionModalProps {
  setValue: (field: string, value: any) => void;
  watch: (field: string) => void;
  error: {
    hasError: boolean;
    message?: string;
  };
  handleSubmit: UseFormHandleSubmit<INewTransactionPayload>;
  onSubmit: (data: INewTransactionPayload) => Promise<void>;
  register: (field: string) => void;
  targets: IGetTarget[];
}

const NewTransactionModal = ({
  setValue,
  watch,
  error,
  handleSubmit,
  onSubmit,
  register,
  targets,
}: NewTransactionModalProps): JSX.Element => {
  useEffect(() => {
    register("target_id");
    register("amount");
  }, [register]);

  // const targets = [
  //   { uuid: "1", description: "Férias" },
  //   { uuid: "2", description: "Presente do filho" },
  //   { uuid: "3", description: "Celular novo" },
  //   { uuid: "4", description: "Casamento" },
  // ];

  return (
    <FormContainer
      id="newTransactionForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
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
