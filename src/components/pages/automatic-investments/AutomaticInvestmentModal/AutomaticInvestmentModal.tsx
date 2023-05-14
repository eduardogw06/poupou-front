import { useEffect, useState } from "react";
import { IError } from "../../../../types/IError";
import { IAlertProps } from "../../../../types/IAlertProps";
import { INewAutomaticInvestmentPayload } from "../../../../types/INewAutomaticInvestmentPayload";
import { useForm } from "react-hook-form";
import { ModalType } from "../../../../types/ModalType";
import { FormContainer } from "./AutomaticInvestmentModal.styles";
import { IGetAutomaticInvestments } from "../../../../types/IGetAutomaticInvestments";
import { IGetTarget } from "../../../../types/IGetTarget";
import { automaticInvestmentsValidate } from "../../../../utils/validations/automaticInvestments";
import { getSession } from "next-auth/react";
import { newAutomaticInvestment } from "../../../../services/newAutomaticInvestment";
import { editAutomaticInvestment } from "../../../../services/editAutomaticInvestment";
import { IApiResponse } from "../../../../types/IApiResponse";
import Input from "../../../common/Input/Input";
import { MenuItem } from "@mui/material";
import InputMoney from "../../../common/InputMoney/InputMoney";
import { automaticInvestmentsDays } from "../../../../config/automaticInvestmentsDays";

interface AutomaticInvestmentModalProps {
  type: ModalType;
  modalData: IGetAutomaticInvestments | null;
  setButtonDisabled: (boolean) => void;
  setIsLoading: (boolean) => void;
  setFeedbackOpened: (boolean) => void;
  setAlertProps: (boolean) => void;
  setModalOpened: (boolean) => void;
  targets: IGetTarget[];
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte automático cadastrado com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultValues: INewAutomaticInvestmentPayload = {
  amount: 0,
  target_id: "",
  day: 1,
  active: false,
};

const AutomaticInvestmentModal = ({
  type,
  modalData,
  targets,
  setButtonDisabled,
  setIsLoading,
  setFeedbackOpened,
  setAlertProps,
  setModalOpened,
}: AutomaticInvestmentModalProps): JSX.Element => {
  const [error, setError] = useState<IError>(defaultError);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (
    data: INewAutomaticInvestmentPayload
  ): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const errors = automaticInvestmentsValidate(data);

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
      type === "create" ? newAutomaticInvestment : editAutomaticInvestment;
    const result = (await onSubmitFunction(
      data,
      session?.user?.jwt
    )) as IApiResponse;

    if (result.success) {
      setAlertProps(
        type === "create"
          ? defaultAlert
          : {
              severity: "success",
              message: "Aporte automático cadastrado com sucesso!",
            }
      );
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
    register("automatic_investment_id");
    register("target_id");
    register("amount");
    register("day");
    register("active");

    if (modalData) {
      setValue("automatic_investment_id", modalData.uuid);
      setValue("target_id", modalData.target.uuid);
      setValue("amount", Number(modalData.amount));
      setValue("day", modalData.day);
      setValue("active", modalData.active);
    } else {
      reset();
    }
  }, [register]);

  return (
    <FormContainer
      id={
        type === "create"
          ? "newAutomaticInvestmentForm"
          : "editAutomaticInvestmentForm"
      }
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="hidden"
        id="automatic_investment_id"
        value={modalData?.uuid}
      />
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
      />

      <Input
        id="day"
        label="Dia do aporte"
        type="number"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("day")}
        select
        onChange={(e: any): void => setValue("day", e.target.value)}
        error={error.hasError}
      >
        {automaticInvestmentsDays &&
          automaticInvestmentsDays.map(
            (day: number): JSX.Element => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            )
          )}
      </Input>

      <Input
        id="active"
        label="Ativo"
        type="text"
        variant="outlined"
        size="small"
        autoComplete="off"
        value={watch("active") === true ? "1" : "0"}
        select
        onChange={(e: any): void => setValue("active", Boolean(e.target.value))}
        error={error.hasError}
        helperText={error.message}
      >
        <MenuItem value={"0"}>Não</MenuItem>
        <MenuItem value={"1"}>Sim</MenuItem>
      </Input>
    </FormContainer>
  );
};

export { AutomaticInvestmentModal };
