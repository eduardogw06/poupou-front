import { Alert, MenuItem } from "@mui/material";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { getCategories as getCategoriesService } from "../../../../services/getCategories";
import { IGetCategory } from "../../../../types/IGetCategory";
import { INewTargetPayload } from "../../../../types/INewTargetPayload";
import Input from "../../../common/Input/Input";
import InputDate from "../../../common/InputDate/InputDate";
import InputMoney from "../../../common/InputMoney/InputMoney";
import { FormContainer, Row } from "../CardNewTarget/CardNewTarget.styles";
import { IGetTarget } from "../../../../types/IGetTarget";
import { ModalType } from "../../../../types/ModalType";

interface NewTransactionModalProps {
  setValue: (field: string, value: any) => void;
  watch: (field: string) => void;
  error: {
    hasError: boolean;
    message?: string;
  };
  handleSubmit: UseFormHandleSubmit<INewTargetPayload>;
  onSubmit: (data: INewTargetPayload) => Promise<void>;
  register: (field: string) => void;
  type: ModalType;
  data?: IGetTarget[];
  button?: JSX.Element;
}

const NewTargetModal = ({
  setValue,
  watch,
  error,
  handleSubmit,
  onSubmit,
  register,
  type,
  data,
  button,
}: NewTransactionModalProps): JSX.Element => {
  const [categories, setCategories] = useState<IGetCategory[]>(null);

  useEffect(() => {
    register("description");
    register("target_amount");
    register("category_id");
    register("date_begin");
    register("date_end");
    register("target_id");

    if (data) {
      setValue("description", data[0].description);
      setValue("target_amount", data[0].target_amount);
      setValue("category_id", data[0].category_id);
      setValue("date_begin", new Date(data[0].date_begin));
      setValue("date_end", new Date(data[0].date_end));
      setValue("target_id", data[0].uuid);
    }

    const getCategories = async (): Promise<void> => {
      const session = await getSession();
      const response = await getCategoriesService(session?.user.jwt);

      if (response && response.success) {
        setCategories(response.data);
      }
    };

    getCategories();
  }, [register]);

  return (
    <FormContainer
      id={type === "create" ? "newTargetForm" : "editTargetForm"}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" id="target_id" value={data && data[0].uuid} />
      <Row>
        <Input
          id="description"
          label="Nome"
          type="text"
          variant="outlined"
          size="small"
          autoComplete="off"
          value={watch("description")}
          onChange={(e: any): void => setValue("description", e.target.value)}
          error={error.hasError}
        />
      </Row>
      <Row>
        <InputMoney
          id="target_amount"
          label="Valor do objetivo"
          type="text"
          variant="outlined"
          size="small"
          value={watch("target_amount")}
          onChange={(e: any): void => setValue("target_amount", e.target.value)}
          error={error.hasError}
        />
        <Input
          id="category_id"
          label="Categoria"
          // type="text"
          variant="outlined"
          size="small"
          autoComplete="off"
          value={watch("category_id")}
          select
          onChange={(e: any): void => setValue("category_id", e.target.value)}
          error={error.hasError}
        >
          <MenuItem value={""}>{"Selecione uma categoria"}</MenuItem>
          {categories &&
            categories.map(
              (category: IGetCategory): JSX.Element => (
                <MenuItem key={category.uuid} value={category.uuid}>
                  {category.description}
                </MenuItem>
              )
            )}
        </Input>
      </Row>

      <Row>
        <InputDate
          label="Data início"
          value={watch("date_begin")}
          onChange={(value): void => setValue("date_begin", value)}
          slotProps={{
            textField: {
              id: "date_begin",
              error: error.hasError,
            },
          }}
        />
        <InputDate
          label="Data limite"
          value={watch("date_end")}
          onChange={(value): void => setValue("date_end", value)}
          slotProps={{
            textField: {
              id: "date_end",
              error: error.hasError,
            },
          }}
        />
      </Row>

      {error.hasError && (
        <Row>
          <Alert severity="error">{error.message}</Alert>
        </Row>
      )}

      {button && <>{button}</>}
    </FormContainer>
  );
};

export default NewTargetModal;
