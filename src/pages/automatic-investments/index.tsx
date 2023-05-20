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
import { isMobile } from "../../utils/isMobile";

import EmptyPageAdvice from "../../components/common/EmptyPageAdvice/EmptyPageAdvice";
import Feedback from "../../components/common/Feedback/Feedback";
import { AutomaticInvestmentModal } from "../../components/pages/automatic-investments/AutomaticInvestmentModal/AutomaticInvestmentModal";
import { AutomaticInvestmentsTable } from "../../components/pages/automatic-investments/AutomaticInvestmentsTable";
import { getAutomaticTransactions } from "../../services/getAutomaticTransactions";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IAlertProps } from "../../types/IAlertProps";
import { IAutomaticInvestments } from "../../types/IAutomaticInvestments";
import { IGetAutomaticInvestments } from "../../types/IGetAutomaticInvestments";
import { IGetTarget } from "../../types/IGetTarget";
import { ModalType } from "../../types/ModalType";
import { isValidToken } from "../../utils/isValidToken";

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte realizado com sucesso!",
};

const AutomaticTransactions = (): JSX.Element => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>("create");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [automaticInvestiments, setAutomaticInvestiments] = useState<
    IGetAutomaticInvestments[] | null
  >(null);
  const [modalData, setModalData] = useState<IGetAutomaticInvestments | null>(
    null
  );
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
      const response = await getAutomaticTransactions(session?.user.jwt);

      if (response && response.success) {
        setAutomaticInvestiments(response.data);
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
          ? "newAutomaticInvestmentForm"
          : "editAutomaticInvestmentForm"
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
    automaticInvestmentData: IGetAutomaticInvestments
  ): void => {
    setModalOpened(true);
    setCurrentModalType(modalType);
    setModalData(automaticInvestmentData);
  };

  const columns = ["Objetivo", "Valor Aporte", "Dia aporte", "Ativo", "Ações"];

  let data: IAutomaticInvestments = {
    columns,
    rows: [],
  };

  if (automaticInvestiments) {
    data = { ...data, rows: automaticInvestiments };
  }

  return (
    <>
      <Container>
        <PageTitle>
          <HeaderTitle>Aporte automático</HeaderTitle>

          <HeaderButtons>
            <Button
              text="Cadastrar"
              size={mobile ? "small" : "medium"}
              onClick={(): void => handleOpenModal("create", undefined)}
            />
          </HeaderButtons>
        </PageTitle>
        {targets ? (
          <>
            <AutomaticInvestmentsTable
              data={data}
              handleOpenModal={handleOpenModal}
            />

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
                    ? "Novo aporte automático"
                    : "Alterar aporte automático"
                }
                handleClose={handleClose}
                buttons={DialogButtons}
              >
                <AutomaticInvestmentModal
                  type={currentModalType}
                  modalData={modalData}
                  setAlertProps={setAlertProps}
                  setButtonDisabled={setButtonDisabled}
                  setIsLoading={setIsLoading}
                  setFeedbackOpened={setFeedbackOpened}
                  setModalOpened={setModalOpened}
                  targets={targets}
                />
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
  if (!session || !isValidToken(session?.user.jwt)) {
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

export default AutomaticTransactions;
