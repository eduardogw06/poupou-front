import { Alert, Switch } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import {
  Container,
  EditEmailForm,
  HeaderTitle,
  InputRow,
  PageTitleLink,
  SubmitButtonRow,
} from "../../components/pages/emails/Emails.styles";
import { getEmails as getEmailsService } from "../../services/getEmails";
import { IGetEmail } from "../../types/IGetEmail";
import { isValidToken } from "../../utils/isValidToken";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import Input from "../../components/common/Input/Input";
import { IError } from "../../types/IError";
import Button from "../../components/common/Button/Button";
import { isMobile } from "../../utils/isMobile";
import { editEmail } from "../../services/editEmail";
import { IApiResponse } from "../../types/IApiResponse";
import Feedback from "../../components/common/Feedback/Feedback";
import { IAlertProps } from "../../types/IAlertProps";

const defaultValues = {
  email_id: "",
  description: "",
  subject: "",
  content: "",
  active: false,
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Email editado com sucesso!",
};

const EmailDetails = (): JSX.Element => {
  const router = useRouter();
  const emailId = router.query.uuid as string;
  const mobile = isMobile();
  const [emails, setEmails] = useState<IGetEmail[] | []>([]);
  const [emailActive, setEmailActive] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<IError>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);

  const TextEditor = dynamic(
    () => import("../../components/common/TextEditor/TextEditor"),
    { ssr: false }
  );

  useEffect((): void => {
    register("email_id");
    register("description");
    register("subject");
    register("content");
    register("active");

    const getEmails = async (): Promise<void> => {
      const session = await getSession();

      if (session && emailId) {
        const response = await getEmailsService(session?.user.jwt, emailId);

        if (response && response.success) {
          setEmails(response.data);
          setValue("email_id", emailId);
          setValue("description", response.data[0].description);
          setValue("subject", response.data[0].subject);
          setValue("content", response.data[0].content);
          setValue("active", response.data[0].active);
          setContent(response.data[0].content);
          setEmailActive(response.data[0].active);
        }
      }
    };

    getEmails();
  }, [emailId]);

  const handleSwitchActiveEmail = (): void => {
    setEmailActive(!emailActive);
  };

  const handleSetEmailContent = (content: string): void => {
    setValue("content", content);
    setContent(content);
  };

  const handleClose = (): void => {
    Router.reload();
  };

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: any): Promise<void> => {
    const session = await getSession();

    data.user_id = session.user.id;
    data.active = emailActive;
    const result = (await editEmail(data, session.user.jwt)) as IApiResponse;

    if (result.success) {
      setIsLoading(false);
      setButtonDisabled(false);
      setFeedbackOpened(true);
    } else {
      setError({
        hasError: true,
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      {emails.length > 0 && (
        <>
          <PageTitle>
            <HeaderTitle>
              <Link href="/emails">
                <PageTitleLink>Emails</PageTitleLink>
              </Link>
              / {emails[0].description}
              <Switch
                checked={emailActive}
                onChange={handleSwitchActiveEmail}
                color="primary"
              />
            </HeaderTitle>
          </PageTitle>

          <EditEmailForm
            id="editEmailForm"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" id="active" value={emailActive ? "1" : "0"} />

            <Alert
              severity={"warning"}
              sx={{
                width: "100%",
                backgroundColor: "#1A1A40",
                color: "#FFFFFF",
                svg: {
                  color: "#FA58B6",
                },
              }}
            >
              {emails[0].warning}
            </Alert>
            <InputRow>
              <Input
                id="description"
                label="Nome"
                type="text"
                variant="outlined"
                size="small"
                autoComplete="off"
                value={watch("description")}
                onChange={(e: any): void =>
                  setValue("description", e.target.value)
                }
                error={error.hasError}
              />
              <Input
                id="subject"
                label="Assunto"
                type="text"
                variant="outlined"
                size="small"
                autoComplete="off"
                value={watch("subject")}
                onChange={(e: any): void => setValue("subject", e.target.value)}
                error={error.hasError}
              />
            </InputRow>

            <TextEditor content={content} setContent={handleSetEmailContent} />

            <SubmitButtonRow>
              <Button
                type="submit"
                form="editEmailForm"
                size={"medium"}
                text="Confirmar"
                loading={isLoading}
                disabled={buttonDisabled}
              />
            </SubmitButtonRow>
          </EditEmailForm>

          <Feedback
            feedbackOpened={feedbackOpened}
            alertProps={defaultAlert}
            handleClose={handleClose}
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

export default EmailDetails;
