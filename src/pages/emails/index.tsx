import { useEffect, useState } from "react";
import { Container } from "../../components/pages/emails/Emails.styles";
import { IEmails } from "../../types/IEmails";
import { IGetEmail } from "../../types/IGetEmail";
import EmailsTable from "../../components/pages/emails/EmailsTable";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { isValidToken } from "../../utils/isValidToken";
import PageTitle from "../../components/common/PageTitle/PageTitle";

const Emails = (): JSX.Element => {
  const [emails, setEmails] = useState<IGetEmail[] | []>([]);

  useEffect((): void => {
    setEmails([
      {
        uuid: "1",
        description: "Novo cadastro",
        warning:
          "Este e-mail será enviado após o cadastro do usuário, se atente nisso ao editar o conteúdo desta mensagem",
        subject: "Bem-vindo(a) ao Sistema Poupou",
        content:
          "Seja bem-vindo(a) ao Sistema Poupou, [name]! Comece a planejar o seu sonho com nosso sistema.",
        active: true,
      },
      {
        uuid: "2",
        description: "Novo objetivo",
        warning:
          "Este e-mail será enviado após o cadastro de um novo objetivo, se atente nisso ao editar o conteúdo desta mensagem",
        subject: "Novo objetivo cadastrado",
        content:
          "Parabéns por começar a investir no seu sonho, [name]. O seu novo objetivo [target_description] está aguardando receber o seu primeiro aporte.",
        active: true,
      },
    ]);
  }, []);

  const columns = ["Descrição", "Ativo", ""];

  let data: IEmails = {
    columns,
    rows: [],
  };

  if (emails) {
    data = {
      ...data,
      rows: emails,
    };
  }

  return (
    <>
      <Container>
        <PageTitle>E-mails</PageTitle>

        <EmailsTable data={data} />
      </Container>
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

export default Emails;
