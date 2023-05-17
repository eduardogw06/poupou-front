import styled from "styled-components";

const Container = styled.div`
    padding: ${(props: any) => {
        const sizes = props.theme.sizes;

        return `${sizes.medium4} ${sizes.none} ${sizes.medium4} ${sizes.none}`;
    }};

    display: flex;
    align-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;

    @media (${(props) => props.theme.media.md}) {
        width: 300px
    };

    & > .login-input:nth-of-type(2)  {
        margin-top: 20px;
    }
`;

const PasswordRecovery = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: ${(props: any): string => props.theme.sizes.small3};
    margin-top: ${(props: any): string => props.theme.sizes.small3};

    font-family: 'Circular Medium';
    font-style: normal;
    font-weight: 400;
    font-size: ${(props: any): string => props.theme.sizes.small3};
    line-height: ${(props: any): string => props.theme.sizes.medium3};
    color: #8B8BAB;
    text-decoration: none;
     cursor: pointer;
`;

const NewAccountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding-top: ${(props: any): string => props.theme.sizes.medium3};
`;

const DontHaveAccountYet = styled.p`
    font-family: 'Circular Medium';
    font-style: normal;
    font-weight: 400;
    font-size: ${(props: any): string => props.theme.sizes.small3};
    line-height: ${(props: any): string => props.theme.sizes.medium3};
    color: #8B8BAB;
    margin-right: ${(props: any): string => props.theme.sizes.small3};
`
const RegisterNow = styled.p`
    font-family: 'Circular Medium';
    font-style: bold;
    font-weight: 400;
    font-size: ${(props: any): string => props.theme.sizes.small3};
    line-height: ${(props: any): string => props.theme.sizes.medium3};
    color: #FFFFFF;
     cursor: pointer;
`

export {
    Container,
    FormContainer,
    PasswordRecovery,
    NewAccountContainer,
    DontHaveAccountYet,
    RegisterNow
};
