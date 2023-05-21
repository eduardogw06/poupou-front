import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #1A1A40;
    border-radius: ${props => props.theme.sizes.medium2};
    width: calc(100vw - 104px); 
    height: 150px;

    @media (${(props: any): string => props.theme.media.md}) { 
        width: calc(100vw - 96px); 
        height: 200px;
    }

`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: ${props => props.theme.sizes.medium3}; 

    & > div:nth-child(odd){
        width: calc(50vw - 60px);
        margin-right: ${props => props.theme.sizes.medium1};
    }

    & > div:nth-child(even){
        width: calc(50vw - 60px);
        margin-right: ${props => props.theme.sizes.none};
    }

    & > div:only-child{
        width: 100vw;
        margin-right: ${props => props.theme.sizes.none};
    }

    @media (${(props: any): string => props.theme.media.md}) {
        & > div:nth-child(odd){
            width: calc(50vw - 60px);
            margin-right: ${props => props.theme.sizes.xlarge1};
        }

        & > div:only-child{
        width: calc(50vw - 147px);
        margin-right: ${props => props.theme.sizes.none};
    }
    }
`;

const FormContainer = styled.form``;


export {
    Container,
    Row,
    FormContainer
};
