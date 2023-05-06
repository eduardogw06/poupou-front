import { Alert } from "@mui/material";
import { IDeleteCategoryPayload } from "../../../types/IDeleteCategoryPayload";
import { IError } from "../../../types/IError";
import { IGetCategory } from "../../../types/IGetCategory";
import {
  AlertRow,
  DeleteCategoryForm,
  DeleteModalLabel,
  DeleteModalRow,
  DeleteModalText,
} from "./Categories.styles";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface IDeleteCategoryModalProps {
  data: IGetCategory;
  onSubmit: (data: IDeleteCategoryPayload) => void;
  error: IError;
}

const defaultValues: IDeleteCategoryPayload = {
  category_id: "",
};

const DeleteCategoryModal = ({
  data,
  onSubmit,
  error,
}: IDeleteCategoryModalProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    register("category_id");

    if (data) {
      setValue("category_id", data.uuid);
    } else {
      reset();
    }
  }, [register]);

  return (
    <DeleteCategoryForm
      id="deleteCategoryForm"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DeleteModalRow>
        <DeleteModalLabel>Categoria:</DeleteModalLabel>
        <DeleteModalText>{data.description}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Ícone:</DeleteModalLabel>
        <DeleteModalText>{data.icon}</DeleteModalText>
      </DeleteModalRow>

      <DeleteModalRow>
        <DeleteModalLabel>Ativo:</DeleteModalLabel>
        <DeleteModalText>{data.active ? "Sim" : "Não"}</DeleteModalText>
      </DeleteModalRow>

      {error.hasError && (
        <AlertRow>
          <Alert severity="error">{error.message}</Alert>
        </AlertRow>
      )}
    </DeleteCategoryForm>
  );
};

export default DeleteCategoryModal;
