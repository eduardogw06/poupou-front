import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button/Button";
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
import DeleteTarget from "../../components/pages/my-targets/DeleteTarget/DeleteTarget";

const Dashboard = (): JSX.Element => {
  const [targets, setTargets] = useState<IGetTarget[] | []>([]);
  const [notDisplayedGrid, setnotDisplayedTargetsGrid] = useState<
    IGetTarget[] | []
  >([]);
  const [targetsGrid, setTargetsGrid] = useState<IGetTarget[] | []>([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [deleteTargetData, setDeleteTargetData] = useState<IGetTarget>();

  const getTotalSaved = (): number => {
    let amountSaved = 0;
    targets.map((target: IGetTarget): void => {
      amountSaved += Number(target.total_saved);
    });

    return amountSaved;
  };

  useEffect((): void => {
    const getTargets = async (): Promise<void> => {
      const session = await getSession();
      const response = await getTargetsService({
        userId: session?.user.id,
        sessionToken: session?.user.jwt,
      });

      if (response && response.success) {
        setTargets(response.data);
        setTargetsGrid(response.data.slice(0, 2));
        setnotDisplayedTargetsGrid(response.data.slice(2));
      }
    };

    getTargets();
    getTotalSaved();
  }, []);

  const selectTargetGrid = (): void => {
    if (notDisplayedGrid) {
      setTargetsGrid([...targetsGrid, ...notDisplayedGrid.slice(0, 2)]);
      setnotDisplayedTargetsGrid(targets.slice(2));
    }
  };

  const handleDeleteCard = (target: IGetTarget): void => {
    setDeleteModalOpened(true);
    setDeleteTargetData(target);
  };

  return (
    <Container>
      <PageTitle>Dashboard</PageTitle>

      <TotalSavedContainer>
        <Card title="Total guardado" justifyContent="flex-start">
          <TotalSaved totalSaved={getTotalSaved()} />
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
                  <SafeProgress target={target}></SafeProgress>
                </Card>
              );
            })}
          {notDisplayedGrid?.length > 0 && (
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
          <MySafesProgress targets={targets}></MySafesProgress>
        </Card>
      </MySafesProgressContainer>

      <DeleteTarget
        deleteTargetData={deleteTargetData}
        deleteModalOpened={deleteModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
      />
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
