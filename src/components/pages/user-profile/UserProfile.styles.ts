import styled from "styled-components";

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    
`

const ProfilePhoto = styled.div`
    width: 200px;
    height: 200px;
    background: ${props => props.theme.colors.tertiary};
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 70px;
    
`;

const UserInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 12px;
    padding-bottom: 12px;
    
    &:first-child {
        padding-top: 0px;
    }
`;

const UserInfoLabel = styled.label`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${props => props.theme.colors.text};
    
`;
const UserInfoText = styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 34px;
    color: ${props => props.theme.colors.text};
    margin-left: 24px;
`;

const Achivements = styled.div``;

const AchivementsText = styled.div`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 34px;
    color: ${props => props.theme.colors.text};
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;
`;

export {
    UserProfileContainer,
    ProfilePhoto,
    UserInfo,
    Achivements,
    ButtonContainer,
    UserInfoLabel,
    UserInfoText,
    UserInfoRow,
    AchivementsText
}