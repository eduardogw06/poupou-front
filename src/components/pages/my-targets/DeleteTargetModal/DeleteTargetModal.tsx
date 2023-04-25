import { useEffect } from "react";
import { IError } from "../../../../types/IError";
import { useForm } from "react-hook-form";
import {
  DeleteModalLabel,
  DeleteModalRow,
  DeleteModalText,
  DeleteTargetForm,
} from "./DeleteTargetModal.styles";
import { IGetTarget } from "../../../../types/IGetTarget";

interface IDeleteTargetModalProps {
  data: IGetTarget;
  onSubmit: (data: IDefaultValue) => void;
  error: IError;
}

interface IDefaultValue {
  target_id: string;
}

const defaultValues: IDefaultValue = {
  target_id: "",
};

const DeleteTargetModal = ({
  data,
  onSubmit,
  error,
}: IDeleteTargetModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("target_id");

    if (data) {
      setValue("target_id", data.uuid);
    } else {
      reset();
    }
  }, [register]);

  return (
    <DeleteTargetForm
      id="deleteTargetForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DeleteModalRow>
        <DeleteModalLabel>Descrição:</DeleteModalLabel>
        <DeleteModalText>{data.description}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Valor do objetivo:</DeleteModalLabel>
        <DeleteModalText>
          {" "}
          {Number(data.target_amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </DeleteModalText>
      </DeleteModalRow>
    </DeleteTargetForm>
  );
};

export default DeleteTargetModal;
