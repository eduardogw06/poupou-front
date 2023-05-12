import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { IAlertProps } from "../../../types/IAlertProps";
import { IUserInfo } from "../../../types/IUserInfo";
import { isMobile } from "../../../utils/isMobile";
import Button from "../../common/Button/Button";
import {
  Achivements,
  AchivementsText,
  ButtonContainer,
  ProfilePhoto,
  ProfilePhotoContainer,
  UpdatePhotoButtonContainer,
  UpdatePhotoForm,
  UpdateProfilePhotoIcon,
  UserInfo,
  UserInfoLabel,
  UserInfoRow,
  UserInfoText,
} from "./UserProfile.styles";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { editUserPhoto } from "../../../services/editUserPhoto";
import { IApiResponse } from "../../../types/IApiResponse";
import { useForm } from "react-hook-form";
import Feedback from "../../common/Feedback/Feedback";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface UserProfileInfoProps {
  userData: IUserInfo;
  editModeOn: boolean;
  setEditModeOn: (boolean) => void;
}

const defaultAlert: IAlertProps = {
  severity: "success",
  message: "Foto alterada com sucesso!",
};

const defaultError = {
  hasError: false,
  message: "",
};

const UserProfileInfo = ({
  userData,
  editModeOn,
  setEditModeOn,
}: UserProfileInfoProps): JSX.Element => {
  const mobile = isMobile();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm();

  const handleClose = (): void => {
    Router.reload();
  };

  const handleImageInputChange = (event) => {
    setValue("photo", event.target.files[0]);
    setButtonDisabled(false);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfilePhoto(null);
    }
  };

  const onSubmit = async (data) => {
    const session = await getSession();
    const result = (await editUserPhoto(
      data,
      session?.user?.jwt
    )) as IApiResponse;
    if (result.success) {
      setIsLoading(false);
      setButtonDisabled(false);
      setFeedbackOpened(true);
    } else {
      setFeedbackOpened(true);
      setAlertProps({
        severity: "error",
        message: result.message,
      });
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  useEffect((): void => {
    register("photo");
  }, [register]);

  return (
    <>
      <UpdatePhotoForm
        id="editUserPhotoForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProfilePhotoContainer htmlFor="photo">
          <ProfilePhoto
            src={
              profilePhoto
                ? profilePhoto
                : userData.photo
                ? `data:image/png;base64,${userData.photo}`
                : "/assets/user-profile-default.png"
            }
            height={userData.photo || profilePhoto ? "200" : "100"}
            width={userData.photo || profilePhoto ? "200" : "100"}
          />
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleImageInputChange}
          />
          <UpdateProfilePhotoIcon>
            <FontAwesomeIcon
              icon={"pencil" as IconProp}
              size="3x"
              color={"#FFF"}
            />
          </UpdateProfilePhotoIcon>
        </ProfilePhotoContainer>
        <UpdatePhotoButtonContainer>
          <Button
            text="Alterar foto"
            size={mobile ? "medium" : "small"}
            fullWidth={mobile}
            outlined={true}
            type="submit"
            form="editUserPhotoForm"
            loading={isLoading}
            disabled={buttonDisabled}
          />
        </UpdatePhotoButtonContainer>
      </UpdatePhotoForm>

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
            onClick={(): void => setEditModeOn(!editModeOn)}
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

      <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      />
    </>
  );
};

export default UserProfileInfo;
