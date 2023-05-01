import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import Card from "../../components/pages/dashboard/Card/Card";
import SafeProgress from "../../components/pages/dashboard/SafeProgress/SafeProgress";
import CardNewTarget from "../../components/pages/my-targets/CardNewTarget/CardNewTarget";
import DeleteTarget from "../../components/pages/my-targets/DeleteTarget/DeleteTarget";
import {
  CardsContainer,
  Container,
} from "../../components/pages/my-targets/MyTargets.styles";
import { getTargets as getTargetsService } from "../../services/getTargets";
import { IGetTarget } from "../../types/IGetTarget";
import { isValidToken } from "../../utils/isValidToken";

const MyTargets = (): JSX.Element => {
  const [targets, setTargets] = useState<IGetTarget[] | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
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
                <SafeProgress target={target}></SafeProgress>
              </Card>
            )
          )}
      </CardsContainer>

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

export default MyTargets;
