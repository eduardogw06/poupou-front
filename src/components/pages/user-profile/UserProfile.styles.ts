import Image from "next/image";
import styled from "styled-components";

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    align-items: center;

    @media (${(props: any): string => props.theme.media.md}) {      
        flex-direction: row;
        align-items: flex-start;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: ${props => props.theme.sizes.none};
    margin-top: ${props => props.theme.sizes.medium3};

    @media (${(props: any): string => props.theme.media.md}) {      
        margin-left: ${props => props.theme.sizes.xlarge2};
        margin-top: ${props => props.theme.sizes.none};
    }
    
`;

const UserInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    
    &:first-child {
        padding-top: ${props => props.theme.sizes.none};
    }

    @media (${(props: any): string => props.theme.media.md}) {      
        padding-top: ${props => props.theme.sizes.small3};
        padding-bottom: ${props => props.theme.sizes.small3};
    }
`;

const UserInfoLabel = styled.label`
    font-family: 'Circular Bold';
    font-style: normal;
    font-weight: 700;
    font-size: ${props => props.theme.sizes.medium1};
    line-height: ${props => props.theme.sizes.medium3};
    color: ${props => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: ${props => props.theme.sizes.medium3};
        line-height: ${props => props.theme.sizes.large1};
    }
`;
const UserInfoText = styled.p`
    font-family: 'Circular Light';
    font-style: normal;
    font-weight: 300;
    font-size: ${props => props.theme.sizes.medium1};
    line-height: ${props => props.theme.sizes.medium3};
    color: ${props => props.theme.colors.text};
    margin-left: ${props => props.theme.sizes.medium3};

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: ${props => props.theme.sizes.medium3};
        line-height: ${props => props.theme.sizes.large1};
    }
`;

const Achivements = styled.div``;

const AchivementsText = styled.div`
    font-family: 'Circular Light';
    font-style: normal;
    font-weight: 300;
    font-size: ${props => props.theme.sizes.small3};
    line-height: ${props => props.theme.sizes.medium1};
    color: ${props => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: ${props => props.theme.sizes.medium1};
        line-height: ${props => props.theme.sizes.medium3};
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: ${props => props.theme.sizes.medium3};

    @media (${(props: any): string => props.theme.media.md}) {      
        flex-direction: row;
    }
`;

const UpdateProfilePhotoIcon = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ProfilePhoto = styled(Image)`
    filter: none;
    position: relative;

    &:hover {
        filter: blur(3px);
    }
`;

const ProfilePhotoContainer = styled.label`
    width: 200px;
    height: 200px;
    background: ${props => props.theme.colors.tertiary};
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    filter: none;
    position: relative;

    &:hover ${UpdateProfilePhotoIcon} {
        display: block;
    }

    @media (${(props: any): string => props.theme.media.md}) {      
        flex-direction: row;
    }
`;

const UpdatePhotoButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`;

const UpdatePhotoForm = styled.form``;

export {
    UserProfileContainer,
    ProfilePhoto,
    ProfilePhotoContainer,
    UserInfo,
    Achivements,
    ButtonContainer,
    UserInfoLabel,
    UserInfoText,
    UserInfoRow,
    AchivementsText,
    UpdatePhotoButtonContainer,
    UpdatePhotoForm,
    UpdateProfilePhotoIcon
}