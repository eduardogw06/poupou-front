import { Alert, Snackbar } from "@mui/material";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Dialog from "../../components/common/Dialog/Dialog";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  NewTransaction,
} from "../../components/pages/my-transactions/MyTransactions.styles";
import MyTransationsTable from "../../components/pages/my-transactions/MyTransactionsTable";
import NewTransactionModal from "../../components/pages/my-transactions/NewTransactionModal";
import { newTransaction } from "../../services/newTransaction";
import { IApiResponse } from "../../types/IApiResponse";
import { MyTransactionsData } from "../../types/IMyTransactions";
import { INewTransactionPayload } from "../../types/INewTransactionPayload";
import { isMobile } from "../../utils/isMobile";

import EmptyPageAdvice from "../../components/common/EmptyPageAdvice/EmptyPageAdvice";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IGetTarget } from "../../types/IGetTarget";

interface IError {
  hasError: boolean;
  message: string;
}

const defaultValues: INewTransactionPayload = {
  amount: "",
  target_id: "",
  type_id: "3425bac3-2025-4284-83d7-72e85dbcabc9",
  date: new Date(),
};

const defaultError = {
  hasError: false,
  message: "",
};

const MyTransactions = (): JSX.Element => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const mobile = isMobile();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  const refreshDefaultValues = (
    newDefaultData: INewTransactionPayload,
    setValue: (fieldName: string, value: any) => void
  ) => {
    Object.keys(defaultValues).forEach((fieldName) => {
      defaultValues[fieldName] = newDefaultData[fieldName];
      setValue(
        fieldName as keyof INewTransactionPayload,
        newDefaultData[fieldName] ?? ""
      );
    });
  };

  const onSubmit = async (data: INewTransactionPayload) => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const result = (await newTransaction(
      data,
      session.user.jwt
    )) as IApiResponse;

    if (result.success) {
      setIsLoading(false);
      setButtonDisabled(false);
      setFeedbackOpened(true);
    } else {
      setError({
        hasError: true,
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  const handleClose = () => {
    setModalOpened(false);
    Router.reload();
  };

  useEffect(() => {
    const getTargets = async (): Promise<void> => {
      const session = await getSession();
      const response = await getTargetsService(session.user.jwt);

      if (response && response.success) {
        setTargets(response.data);
      }
    };

    getTargets();
  }, [register]);

  const DialogButtons = (
    <Button
      type="submit"
      form="newTransactionForm"
      size={mobile ? "medium" : "small"}
      text="Cadastrar"
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  const columns = [
    "ID aporte",
    "Valor Aporte",
    "Objetivo",
    "Data aporte",
    "Ações",
  ];

  const rows = [
    {
      uuid: "1",
      amount: "150.0",
      target: { uuid: "1", description: "Férias" },
      date: "2023-01-04T22:23:10.130Z",
    },
    {
      uuid: "2",
      amount: "50.0",
      target: { uuid: "1", description: "Férias" },
      date: "2023-01-04T22:23:10.130Z",
    },
    {
      uuid: "3",
      amount: "1000.25",
      target: { uuid: "2", description: "Presente filho" },
      date: "2023-01-04T22:23:10.130Z",
    },
    {
      uuid: "4",
      amount: "25.0",
      target: { uuid: "1", description: "Férias" },
      date: "2023-01-04T22:23:10.130Z",
    },
  ];

  const data: MyTransactionsData = {
    columns,
    rows,
  };

  return (
    <>
      <Container>
        <PageTitle>Meus aportes</PageTitle>
        {targets ? (
          <>
            <NewTransaction>
              <Button
                text="Novo aporte"
                size="small"
                onClick={(): void => setModalOpened(!modalOpened)}
              ></Button>
            </NewTransaction>

            <MyTransationsTable data={data} />

            <Snackbar
              open={feedbackOpened}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Cadastro atualizado com sucesso!
              </Alert>
            </Snackbar>

            <Dialog
              isOpen={modalOpened}
              title="Novo aporte"
              handleClose={handleClose}
              buttons={DialogButtons}
            >
              <NewTransactionModal
                setValue={setValue}
                watch={watch}
                error={error}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
              ></NewTransactionModal>
            </Dialog>
          </>
        ) : (
          <EmptyPageAdvice
            text="Não encontramos nenhum objetivo cadastrado. Para cadastrar um objetivo e poder começar a investir no seu sonho clique "
            href="/meus-objetivos"
            hrefText="AQUI."
          />
        )}
      </Container>
    </>
  );
};

export default MyTransactions;
