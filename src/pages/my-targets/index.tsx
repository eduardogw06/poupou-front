import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import Card from "../../components/pages/dashboard/Card/Card";
import SafeProgress from "../../components/pages/dashboard/SafeProgress/SafeProgress";
import CardNewTarget from "../../components/pages/my-targets/CardNewTarget/CardNewTarget";
import {
  CardsContainer,
  Container,
} from "../../components/pages/my-targets/MyTargets.styles";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IGetTarget } from "../../types/IGetTarget";
import { isValidToken } from "../../utils/isValidToken";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { IError } from "../../types/IError";
import Button from "../../components/common/Button/Button";
import { isMobile } from "../../utils/isMobile";
import { deleteTarget as deleteTargetService } from "../../services/deleteTarget";
import Dialog from "../../components/common/Dialog/Dialog";
import DeleteTargetModal from "../../components/pages/my-targets/DeleteTargetModal/DeleteTargetModal";
import Feedback from "../../components/common/Feedback/Feedback";
import { IAlertProps } from "../../types/IAlertProps";
import Router from "next/router";

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte excluído com sucesso!",
};

const MyTargets = (): JSX.Element => {
  const mobile = isMobile();
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [deleteTargetData, setDeleteTargetData] = useState<IGetTarget | null>(
    null
  );

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

    getTargets();
  }, []);

  const handleDeleteCard = (target: IGetTarget): void => {
    setDeleteModalOpened(true);
    setDeleteTargetData(target);
  };

  const handleFeedbackClose = () => {
    setDeleteModalOpened(false);
    Router.reload();
  };

  const deleteTarget = async (data: { target_id: string }): Promise<void> => {
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const response = await deleteTargetService(data, session?.user.jwt);

    if (response && response.success) {
      setFeedbackOpened(true);
    } else {
      setError({
        hasError: true,
        message: response.message,
      });
    }
  };

  const DialogButtons = (
    <>
      <Button
        type="button"
        size={mobile ? "medium" : "small"}
        text="Não"
        outlined
        onClick={(): void => setDeleteModalOpened(false)}
      />
      <Button
        type="submit"
        form="deleteTargetForm"
        size={mobile ? "medium" : "small"}
        text="Confirmar"
        loading={isLoading}
        disabled={buttonDisabled}
      />
    </>
  );

  return (
    <Container>
      <PageTitle>Meus objetivos</PageTitle>

      <CardsContainer>
        <CardNewTarget targets={targets} />

        {targets &&
          targets.map(
            (target: IGetTarget): JSX.Element => (
              <Card
                key={target.uuid}
                icon={target.category_icon}
                color={"#1A1A40"}
                title={target.description}
                deleteCardButton
                handleDeleteCard={(): void => handleDeleteCard(target)}
              >
                <SafeProgress target={target.uuid}></SafeProgress>
              </Card>
            )
          )}
      </CardsContainer>
      {deleteTargetData && (
        <>
          <Dialog
            isOpen={deleteModalOpened}
            title="Deseja realmente remover este objetivo?"
            handleClose={(): void => setDeleteModalOpened(false)}
            buttons={DialogButtons}
          >
            <DeleteTargetModal
              data={deleteTargetData}
              onSubmit={deleteTarget}
              error={error}
            />
          </Dialog>

          <Feedback
            feedbackOpened={feedbackOpened}
            alertProps={defaultAlert}
            handleClose={handleFeedbackClose}
          />
        </>
      )}
    </Container>
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

export default MyTargets;
