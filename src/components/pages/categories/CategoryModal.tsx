import { useForm } from "react-hook-form";
import { IGetCategory } from "../../../types/IGetCategory";
import { ModalType } from "../../../types/ModalType";
import { ICategoryPayload } from "../../../types/ICategoryPayload";
import { FormContainer } from "./Categories.styles";
import Input from "../../common/Input/Input";
import { useEffect, useState } from "react";
import { IError } from "../../../types/IError";
import { getSession } from "next-auth/react";
import { IApiResponse } from "../../../types/IApiResponse";
import { newCategory } from "../../../services/newCategory";
import { editCategory } from "../../../services/editCategory";
import { IAlertProps } from "../../../types/IAlertProps";
import { MenuItem } from "@mui/material";
import Router from "next/router";
import { categoriesValidate } from "../../../utils/validations/categories";

const defaultValues: ICategoryPayload = {
  category_id: "",
  description: "",
  active: false,
  icon: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte atualizado com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

interface CategoryModalProps {
  type: ModalType;
  modalData: IGetCategory | null;
  setButtonDisabled: (boolean) => void;
  setIsLoading: (boolean) => void;
  setFeedbackOpened: (boolean) => void;
  setAlertProps: (boolean) => void;
  setModalOpened: (boolean) => void;
}

const CategoryModal = ({
  type,
  modalData,
  setButtonDisabled,
  setIsLoading,
  setFeedbackOpened,
  setAlertProps,
  setModalOpened,
}: CategoryModalProps): JSX.Element => {
  const [error, setError] = useState<IError>(defaultError);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data: ICategoryPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const errors = categoriesValidate(data);
    console.log(errors);
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
    const onSubmitFunction = type === "create" ? newCategory : editCategory;
    const result = (await onSubmitFunction(
      data,
      session.user.jwt
    )) as IApiResponse;

    if (result.success) {
      setAlertProps(defaultAlert);
      setFeedbackOpened(true);
      setModalOpened(false);
      Router.reload();
    } else {
      setError({
        hasError: true,
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect((): void => {
    register("category_id");
    register("description");
    register("active");
    register("icon");

    if (modalData) {
      setValue("category_id", modalData.uuid);
      setValue("description", modalData.description);
      setValue("active", modalData.active);
      setValue("icon", modalData.icon);
    } else {
      reset();
    }
  }, [register]);

  return (
    <FormContainer
      id={type === "create" ? "newCategoryForm" : "editCategoryForm"}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" id="category_id" value={modalData?.uuid} />
      <Input
        id="name"
        label="Categoria"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("description")}
        onChange={(e: any): void => setValue("description", e.target.value)}
        error={error.hasError}
      />

      <Input
        id="name"
        label="Ativo"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("active") === true ? "1" : "0"}
        select
        onChange={(e: any): void => setValue("active", e.target.value)}
        error={error.hasError}
      >
        <MenuItem value={"0"}>Não</MenuItem>
        <MenuItem value={"1"}>Sim</MenuItem>
      </Input>

      <Input
        id="icon"
        label="Ícone"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("icon")}
        onChange={(e: any): void => setValue("icon", e.target.value)}
        error={error.hasError}
        helperText={error.message}
      />
    </FormContainer>
  );
};

export default CategoryModal;
