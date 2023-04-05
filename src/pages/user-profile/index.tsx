import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/common/Button/Button";
import Dialog from "../../components/common/Dialog/Dialog";
import EditUser from "../../components/pages/user-profile/EditUser";
import {
  Achivements,
  AchivementsText,
  ButtonContainer,
  ProfilePhoto,
  UserInfo,
  UserInfoLabel,
  UserInfoRow,
  UserInfoText,
  UserProfileContainer,
} from "../../components/pages/user-profile/UserProfile.styles";
import { editUser } from "../../services/editUser";
import { getUser } from "../../services/getUser";
import { IApiResponse } from "../../types/IApiResponse";
import { IEditUserPayload } from "../../types/IEditUserPayload";
import { IUserInfo } from "../../types/IUserInfo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Router from "next/router";
import Link from "next/link";
import { isMobile } from "../../utils/isMobile";
import { getSession } from "next-auth/react";

interface IError {
  hasError: boolean;
  message: string;
}

const defaultValues: IEditUserPayload = {
  name: "",
  email: "",
};

const defaultError = {
  hasError: false,
  message: "",
};

const UserProfile = (): JSX.Element => {
  const [editModeOn, setEditModOn] = useState<boolean>(false);
  const [error, setError] = useState<IError>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
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

  useEffect(() => {
    register("name");
    register("email");

    const getUserInfo = async () => {
      const session = await getSession();
      const response = await getUser(session.user.jwt);
      if (response.success) {
        refreshDefaultValues(response.data as IUserInfo, setValue);
        setUserData(response.data as IUserInfo);
      }
    };

    getUserInfo();
  }, [register]);

  const onSubmit = async (data: IEditUserPayload) => {
    setError(defaultError);
    setIsLoading(true);
    setButtonDisabled(true);

    const session = await getSession();
    const result = (await editUser(data, session.user.jwt)) as IApiResponse;

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

  const handleClose = () => {
    setEditModOn(false);
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
          <ProfilePhoto>
            <Image
              src="/assets/user-profile-default.png"
              height="100"
              width="100"
            ></Image>
          </ProfilePhoto>
          <UserInfo>
            <UserInfoRow>
              <UserInfoLabel>Nome:</UserInfoLabel>
              <UserInfoText>{userData.name}</UserInfoText>
            </UserInfoRow>

            <UserInfoRow>
              <UserInfoLabel>E-mail:</UserInfoLabel>
              <UserInfoText>{userData.email}</UserInfoText>
            </UserInfoRow>

            <UserInfoRow>
              <UserInfoLabel>Usuário desde:</UserInfoLabel>
              <UserInfoText>
                {format(new Date(userData.created_at), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </UserInfoText>
            </UserInfoRow>

            <UserInfoRow>
              <UserInfoLabel>Selos consquistados:</UserInfoLabel>
            </UserInfoRow>

            <Achivements>
              <AchivementsText>
                Nenhum selo consquistado. Crie um objetivo e comece a poupar.
              </AchivementsText>
            </Achivements>

            <ButtonContainer>
              <Button
                text="Editar"
                size={mobile ? "medium" : "small"}
                fullWidth={mobile}
                onClick={(): void => setEditModOn(!editModeOn)}
              />

              <Link href="/alterar-senha">
                <Button
                  text="Alterar senha"
                  size={mobile ? "medium" : "small"}
                  fullWidth={mobile}
                  outlined={true}
                />
              </Link>
            </ButtonContainer>
          </UserInfo>
        </UserProfileContainer>
      )}

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

      <Snackbar
        open={feedbackOpened}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Cadastro atualizado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserProfile;
