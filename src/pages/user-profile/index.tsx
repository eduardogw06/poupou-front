import { Backdrop, CircularProgress } from "@mui/material";
import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Dialog from "../../components/common/Dialog/Dialog";
import Feedback from "../../components/common/Feedback/Feedback";
import EditUser from "../../components/pages/user-profile/EditUser/EditUser";
import { UserProfileContainer } from "../../components/pages/user-profile/UserProfile.styles";
import UserProfileInfo from "../../components/pages/user-profile/UserProfileInfo";
import { editUser } from "../../services/editUser";
import { getUser } from "../../services/getUser";
import { IAlertProps } from "../../types/IAlertProps";
import { IApiResponse } from "../../types/IApiResponse";
import { IEditUserPayload } from "../../types/IEditUserPayload";
import { IError } from "../../types/IError";
import { IUserInfo } from "../../types/IUserInfo";
import { isMobile } from "../../utils/isMobile";

const defaultValues: IEditUserPayload = {
  name: "",
  email: "",
};

const defaultError = {
  hasError: false,
  message: "",
};

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Cadastro atualizado com sucesso!",
};

const UserProfile = (): JSX.Element => {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const mobile = isMobile();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({ defaultValues });

  const refreshDefaultValues = (
    newDefaultData: IEditUserPayload,
    setValue: (fieldName: string, value: any) => void
  ) => {
    Object.keys(defaultValues).forEach((fieldName) => {
      defaultValues[fieldName] = newDefaultData[fieldName];
      setValue(
        fieldName as keyof IEditUserPayload,
        newDefaultData[fieldName] ?? ""
      );
    });
  };

  useEffect((): void => {
    register("name");
    register("email");

    const getUserInfo = async (): Promise<void> => {
      const session = await getSession();
      const response = await getUser(session?.user.jwt);
      if (response.success) {
        refreshDefaultValues(response.data as IUserInfo, setValue);
        setUserData(response.data as IUserInfo);
      } else {
        setFeedbackOpened(true);
        setAlertProps({
          severity: "error",
          message: response.message,
        });
      }
    };

    getUserInfo();
  }, [register]);

  const onSubmit = async (data: IEditUserPayload): Promise<void> => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const result = (await editUser(data, session?.user.jwt)) as IApiResponse;

    if (result.success) {
      setAlertProps(defaultAlert);
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

  const handleClose = (): void => {
    setEditModeOn(false);
    Router.reload();
  };

  const DialogButtons = (
    <Button
      type="submit"
      form="editUserForm"
      size={mobile ? "medium" : "small"}
      text="Alterar"
      loading={isLoading}
      disabled={buttonDisabled}
    />
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!userData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {userData && (
        <UserProfileContainer>
          <UserProfileInfo
            userData={userData}
            editModeOn={editModeOn}
            setEditModeOn={setEditModeOn}
          />
        </UserProfileContainer>
      )}

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      />

      <Dialog
        isOpen={editModeOn}
        title="Editar usuário"
        handleClose={handleClose}
        buttons={DialogButtons}
      >
        <EditUser
          setValue={setValue}
          watch={watch}
          error={error}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          userData={userData}
        ></EditUser>
      </Dialog>
    </>
  );
};

export const getServerSideProps = async (context) => {
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

export default UserProfile;
