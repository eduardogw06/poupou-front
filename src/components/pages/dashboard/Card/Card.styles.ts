import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colors.secondary};
    border-radius: ${props => props.theme.colors.medium2};
    width: calc(100vw - 96px);
`;

const Content = styled.div<{
    justifyContent: | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
}>`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justifyContent};
    padding-top: ${props => props.theme.sizes.medium1};
    padding-bottom: ${props => props.theme.sizes.medium1};
    padding-left: ${props => props.theme.sizes.medium2};
    padding-right: ${props => props.theme.sizes.medium2};

`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Circular Bold';
    font-weight: bold;
    font-size: ${props => props.theme.sizes.medium3};
    line-height: ${props => props.theme.sizes.medium3};
    color: #FFFFFF;
    cursor: pointer;

    padding-top: ${props => props.theme.sizes.medium1};
    padding-bottom: ${props => props.theme.sizes.medium1};
    padding-left: ${props => props.theme.sizes.medium2};
    padding-right: ${props => props.theme.sizes.medium2};

`;

const Icon = styled.div`
    margin-right: ${props => props.theme.sizes.small3};
`;


export { Container, Content, Title, Icon }