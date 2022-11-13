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

    @media (${(props: any): string => props.theme.media.md}) {      
        flex-direction: row;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0px;
    margin-top: 24px;

    @media (${(props: any): string => props.theme.media.md}) {      
        margin-left: 70px;
        margin-top: 0px;
    }
    
`;

const UserInfoRow = styled.div`
    display: flex;
    flex-direction: row;
    
    &:first-child {
        padding-top: 0px;
    }

    @media (${(props: any): string => props.theme.media.md}) {      
        padding-top: 12px;
        padding-bottom: 12px;
    }
`;

const UserInfoLabel = styled.label`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${props => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: 24px;
        line-height: 34px;
    }
`;
const UserInfoText = styled.p`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: ${props => props.theme.colors.text};
    margin-left: 24px;

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: 24px;
        line-height: 34px;
    }
`;

const Achivements = styled.div``;

const AchivementsText = styled.div`
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: ${props => props.theme.colors.text};

    @media (${(props: any): string => props.theme.media.md}) {      
        font-size: 16px;
        line-height: 24px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 24px;

    @media (${(props: any): string => props.theme.media.md}) {      
        flex-direction: row;
    }
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