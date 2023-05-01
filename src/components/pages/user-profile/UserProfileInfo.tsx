import Image from "next/image";
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IUserInfo } from "../../../types/IUserInfo";
import { isMobile } from "../../../utils/isMobile";
import Button from "../../common/Button/Button";
import Link from "next/link";

interface UserProfileInfoProps {
  userData: IUserInfo;
  editModeOn: boolean;
  setEditModeOn: (boolean) => void;
}

const UserProfileInfo = ({
  userData,
  editModeOn,
  setEditModeOn,
}: UserProfileInfoProps): JSX.Element => {
  const mobile = isMobile();
  return (
    <>
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
    </>
  );
};

export default UserProfileInfo;
