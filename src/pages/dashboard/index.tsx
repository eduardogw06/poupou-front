import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import Card from "../../components/pages/dashboard/Card/Card";
import {
  Container,
  MySafesProgressContainer,
  SafeProgressContainer,
  SeeMoreTargetsContainer,
  TotalSavedContainer,
} from "../../components/pages/dashboard/Dashboard.styles";
import MySafesProgress from "../../components/pages/dashboard/MySafesProgress/MySafesProgress";
import SafeProgress from "../../components/pages/dashboard/SafeProgress/SafeProgress";
import TotalSaved from "../../components/pages/dashboard/TotalSaved/TotalSaved";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IGetTarget } from "../../types/IGetTarget";
import { isValidToken } from "../../utils/isValidToken";
import Button from "../../components/common/Button/Button";
import { deleteTarget as deleteTargetService } from "../../services/deleteTarget";
import { IError } from "../../types/IError";
import Dialog from "../../components/common/Dialog/Dialog";
import { isMobile } from "../../utils/isMobile";
import DeleteTargetModal from "../../components/pages/my-targets/DeleteTargetModal/DeleteTargetModal";
import Feedback from "../../components/common/Feedback/Feedback";
import { IAlertProps } from "../../types/IAlertProps";
import Router from "next/router";

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Aporte excluído com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const Dashboard = (): JSX.Element => {
  const mobile = isMobile();
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [targetsGrid, setTargetsGrid] = useState<IGetTarget[] | null>(null);
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
        setTargetsGrid(response.data.slice(0, 2));
        setTargets(response.data.slice(2));
      }
    };

    getTargets();
  }, []);

  const selectTargetGrid = (): void => {
    if (targets) {
      setTargetsGrid([...targetsGrid, ...targets.slice(0, 2)]);
      setTargets(targets.slice(2));
    }
  };

  const handleFeedbackClose = () => {
    setDeleteModalOpened(false);
    Router.reload();
  };

  const handleDeleteCard = (target: IGetTarget): void => {
    setDeleteModalOpened(true);
    setDeleteTargetData(target);
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
      <PageTitle>Dashboard</PageTitle>

      <TotalSavedContainer>
        <Card title="Total guardado" justifyContent="flex-start">
          <TotalSaved />
        </Card>
      </TotalSavedContainer>

      <SafeProgressContainer>
        <>
          {targetsGrid &&
            targetsGrid.map((target: IGetTarget): JSX.Element => {
              return (
                <Card
                  key={target.uuid}
                  icon={target.category_icon}
                  title={target.description}
                  deleteCardButton
                  handleDeleteCard={(): void => handleDeleteCard(target)}
                >
                  <SafeProgress target={target.uuid}></SafeProgress>
                </Card>
              );
            })}
          {targets?.length > 0 && (
            <SeeMoreTargetsContainer className="seeMore">
              <Button
                type="button"
                text="Ver mais"
                size="large"
                onClick={selectTargetGrid}
              ></Button>
            </SeeMoreTargetsContainer>
          )}
        </>
      </SafeProgressContainer>

      <MySafesProgressContainer>
        <Card title="Meus cofres">
          <MySafesProgress></MySafesProgress>
        </Card>
      </MySafesProgressContainer>

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

export default Dashboard;
