import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import Card from "../../components/pages/dashboard/Card/Card";
import {
  Container,
  MySafesProgressContainer,
  SafeProgressContainer,
  TotalSavedContainer,
} from "../../components/pages/dashboard/Dashboard.styles";
import MySafesProgress from "../../components/pages/dashboard/MySafesProgress/MySafesProgress";
import SafeProgress from "../../components/pages/dashboard/SafeProgress/SafeProgress";
import TotalSaved from "../../components/pages/dashboard/TotalSaved/TotalSaved";

const Dashboard = (): JSX.Element => {
  return (
    <Container>
      <PageTitle>Dashboard</PageTitle>

      <TotalSavedContainer>
        <Card title="Total guardado" justifyContent="flex-start">
          <TotalSaved />
        </Card>
      </TotalSavedContainer>

      <SafeProgressContainer>
        <Card icon="umbrella-beach" title="Férias">
          <SafeProgress></SafeProgress>
        </Card>

        <Card icon="mobile-screen" title="Celular novo">
          <SafeProgress></SafeProgress>
        </Card>
      </SafeProgressContainer>

      <MySafesProgressContainer>
        <Card title="Meus cofres">
          <MySafesProgress></MySafesProgress>
        </Card>
      </MySafesProgressContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
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
