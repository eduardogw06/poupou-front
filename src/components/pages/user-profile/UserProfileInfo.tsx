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
  UserInfo,
  UserInfoLabel,
  UserInfoRow,
  UserInfoText,
} from "./UserProfile.styles";

interface UserProfileInfoProps {
  userData: IUserInfo;
  editModeOn: boolean;
  setEditModeOn: (boolean) => void;
}

// const defaultAlert: IAlertProps = {
//   severity: "success",
//   message: "Foto alterada com sucesso!",
// };

// const defaultError = {
//   hasError: false,
//   message: "",
// };

const UserProfileInfo = ({
  userData,
  editModeOn,
  setEditModeOn,
}: UserProfileInfoProps): JSX.Element => {
  const mobile = isMobile();
  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  // const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  // const [alertProps, setAlertProps] = useState<IAlertProps>(defaultAlert);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { register, handleSubmit, setValue } = useForm();

  // const handleClose = (): void => {
  //   Router.reload();
  // };

  // const onSubmit = async (data) => {
  //   const session = await getSession();
  //   const result = (await editUserPhoto(
  //     data,
  //     session?.user?.jwt
  //   )) as IApiResponse;
  //   if (result.success) {
  //     setIsLoading(false);
  //     setButtonDisabled(false);
  //     setFeedbackOpened(true);
  //   } else {
  //     setFeedbackOpened(true);
  //     setAlertProps({
  //       severity: "error",
  //       message: result.message,
  //     });
  //     setIsLoading(false);
  //     setButtonDisabled(false);
  //   }
  // };

  // useEffect((): void => {
  //   register("photo");
  // }, [register]);

  return (
    <>
      {/* <form
        id="editUserPhotoForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      > */}
      <ProfilePhoto
      // htmlFor="photo"
      >
        <Image
          src={
            userData.photo
              ? `http://localhost:8080/tmp/photo/${userData.photo}`
              : "/assets/user-profile-default.png"
          }
          height="100"
          width="100"
        />
        {/* <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={(e) => {
              setValue("photo", e.target.files[0]);
              setButtonDisabled(false);
            }}
          /> */}
      </ProfilePhoto>
      {/* <UpdatePhotoButtonContainer>
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
        </UpdatePhotoButtonContainer> */}
      {/* </form> */}

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

      {/* <Feedback
        feedbackOpened={feedbackOpened}
        alertProps={alertProps}
        handleClose={handleClose}
      /> */}
    </>
  );
};

export default UserProfileInfo;
