import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
import Dialog from "../../components/common/Dialog/Dialog";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  HeaderButtons,
  HeaderTitle,
} from "../../components/pages/my-transactions/MyTransactions.styles";
import MyTransationsTable from "../../components/pages/my-transactions/MyTransactionsTable";
import TransactionModal from "../../components/pages/my-transactions/TransactionModal/TransactionModal";
import { MyTransactions as MyTransactionsData } from "../../types/IMyTransactions";
import { isMobile } from "../../utils/isMobile";

import EmptyPageAdvice from "../../components/common/EmptyPageAdvice/EmptyPageAdvice";
import Feedback from "../../components/common/Feedback/Feedback";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { getTransactions as getTransactionsService } from "../../services/getTransactions";
import { IAlertProps } from "../../types/IAlertProps";
import { IGetTarget } from "../../types/IGetTarget";
import { IGetTransaction } from "../../types/IGetTransaction";
import { ModalType } from "../../types/ModalType";
import { isValidToken } from "../../utils/isValidToken";

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte realizado com sucesso!",
};

const MyTransactions = (): JSX.Element => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>("create");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [transactions, setTransactions] = useState<IGetTransaction[] | null>(
    null
  );
  const [modalData, setModalData] = useState<IGetTransaction | null>(null);
  const mobile = isMobile();

  useEffect((): void => {
    const getTargets = async (): Promise<void> => {
      const session = await getSession();
      const response = await getTargetsService({
        userId: session?.user.id,
        sessionToken: session?.user.jwt,
      });

      if (response && response.success) {
        setTargets(response.data);
      }
    };

    const getTransactions = async (): Promise<void> => {
      const session = await getSession();
      const response = await getTransactionsService({
        userId: session?.user.id,
        sessionToken: session?.user.jwt,
      });

      if (response && response.success) {
        setTransactions(response.data);
      }
    };

    getTargets();
    getTransactions();
  }, []);

  const DialogButtons = (
    <Button
      type="submit"
      form={
        currentModalType === "create"
          ? "newTransactionForm"
          : "editTransactionForm"
      }
      size={mobile ? "small" : "medium"}
      text={currentModalType === "create" ? "Cadastrar" : "Alterar"}
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  const handleClose = () => {
    setModalOpened(false);
    Router.reload();
  };

  const handleOpenModal = (
    modalType: ModalType,
    transactionData: IGetTransaction
  ): void => {
    setModalOpened(true);
    setCurrentModalType(modalType);
    setModalData(transactionData);
  };

  const columns = ["Valor Aporte", "Objetivo", "Data aporte", "Ações"];

  let data: MyTransactionsData = {
    columns,
    rows: [],
  };

  if (transactions) {
    data = { ...data, rows: transactions };
  }

  return (
    <>
      <Container>
        <PageTitle>
          <HeaderTitle>Meus aportes</HeaderTitle>
          <HeaderButtons>
            <Button
              text="Novo aporte"
              size={mobile ? "small" : "medium"}
              onClick={(): void => handleOpenModal("create", undefined)}
            />
          </HeaderButtons>
        </PageTitle>

        {targets ? (
          <>
            <MyTransationsTable data={data} handleOpenModal={handleOpenModal} />

            <Feedback
              feedbackOpened={feedbackOpened}
              alertProps={alertProps}
              handleClose={handleClose}
            />

            {modalOpened && (
              <Dialog
                isOpen={modalOpened}
                title={
                  currentModalType === "create"
                    ? "Novo aporte"
                    : "Alterar aporte"
                }
                handleClose={handleClose}
                buttons={DialogButtons}
              >
                <TransactionModal
                  type={currentModalType}
                  modalData={modalData}
                  setAlertProps={setAlertProps}
                  setButtonDisabled={setButtonDisabled}
                  setIsLoading={setIsLoading}
                  setFeedbackOpened={setFeedbackOpened}
                  setModalOpened={setModalOpened}
                  targets={targets}
                ></TransactionModal>
              </Dialog>
            )}
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

export const getServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  if (session && !isValidToken(session?.user.jwt)) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default MyTransactions;
