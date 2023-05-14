import { useEffect, useState } from "react";
import { Container } from "../../components/pages/emails/Emails.styles";
import { IEmails } from "../../types/IEmails";
import { IGetEmail } from "../../types/IGetEmail";
import EmailsTable from "../../components/pages/emails/EmailsTable";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { isValidToken } from "../../utils/isValidToken";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import { getEmails as getEmailsService } from "../../services/getEmails";

const Emails = (): JSX.Element => {
  const [emails, setEmails] = useState<IGetEmail[] | []>([]);

  useEffect((): void => {
    const getMails = async (): Promise<void> => {
      const session = await getSession();
      const response = await getEmailsService(session?.user.jwt);

      if (response && response.success) {
        setEmails(response.data);
      }
    };

    getMails();
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

  if (!session.user.is_admin) {
    return {
      redirect: {
        destination: "/dashboard",
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
