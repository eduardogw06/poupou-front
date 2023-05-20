import { getSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  HeaderButtons,
  HeaderTitle,
  PageTitleLink,
  StyledTab,
  StyledTabs,
} from "../../components/pages/my-targets/TargetPage/TargetPage.styles";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IGetTarget } from "../../types/IGetTarget";
import { Box } from "@mui/material";
import TargetProgressTab from "../../components/pages/my-targets/TargetPage/TargetProgressTab/TargetProgressTab";
import TargetTransactionsTab from "../../components/pages/my-targets/TargetPage/TargetTransactionsTab/TargetTransactionsTab";
import TargetConfigs from "../../components/pages/my-targets/TargetPage/TargetConfigs/TargetConfigs";
import { isValidToken } from "../../utils/isValidToken";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Button from "../../components/common/Button/Button";
import { ModalType } from "../../types/ModalType";
import { IAlertProps } from "../../types/IAlertProps";
import Dialog from "../../components/common/Dialog/Dialog";
import { isMobile } from "../../utils/isMobile";
import TransactionModal from "../../components/pages/my-transactions/TransactionModal/TransactionModal";
import Feedback from "../../components/common/Feedback/Feedback";
import { IGetTransaction } from "../../types/IGetTransaction";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte realizado com sucesso!",
};

const MyTargetPage = (): JSX.Element => {
  const router = useRouter();
  const targetId = router.query.uuid as string;
  const mobile = isMobile();
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [tabValue, setTabValue] = useState<number>(0);

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [currentModalType, setCurrentModalType] = useState<ModalType>("create");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IGetTransaction | null>(null);

  const TabPanel = (props: TabPanelProps): JSX.Element => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  useEffect((): void => {
    const getTargets = async (): Promise<void> => {
      const session = await getSession();

      if (session && targetId) {
        const response = await getTargetsService({
          userId: session?.user.id,
          sessionToken: session?.user.jwt,
          targetId: targetId,
        });

        if (response && response.success) {
          setTargets(response.data);
        }
      }
    };

    getTargets();
  }, [targetId]);

  const DialogButtons = (
    <Button
      type="submit"
      form={
        currentModalType === "create"
          ? "newTransactionForm"
          : "editTransactionForm"
      }
      size={mobile ? "medium" : "small"}
      text={currentModalType === "create" ? "Cadastrar" : "Alterar"}
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  return (
    <>
      {targets && targets.length > 0 && (
        <Container>
          <PageTitle>
            <HeaderTitle>
              <Link href="/meus-objetivos">
                <PageTitleLink>Meus objetivos</PageTitleLink>
              </Link>
              / {targets[0].description}
            </HeaderTitle>

            <HeaderButtons>
              <Button
                type="button"
                text="Exportar"
                size={mobile ? "small" : "medium"}
              ></Button>
              <Button
                type="button"
                text="Novo aporte"
                size={mobile ? "small" : "medium"}
                onClick={(): void => handleOpenModal("create", undefined)}
                outlined
              ></Button>
            </HeaderButtons>
          </PageTitle>

          <Box>
            <StyledTabs
              value={tabValue}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <StyledTab value={0} label="Progresso do objetivo" wrapped />
              <StyledTab value={1} label="Aportes realizados" />
              <StyledTab value={2} label="Configurações do objetivo" />
            </StyledTabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TargetProgressTab target={targets[0]} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TargetTransactionsTab handleOpenModal={handleOpenModal} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TargetConfigs targetData={targets} />
          </TabPanel>

          {modalOpened && (
            <Dialog
              isOpen={modalOpened}
              title={
                currentModalType === "create" ? "Novo aporte" : "Alterar aporte"
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

          <Feedback
            feedbackOpened={feedbackOpened}
            alertProps={alertProps}
            handleClose={handleClose}
          />
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

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

export default MyTargetPage;
