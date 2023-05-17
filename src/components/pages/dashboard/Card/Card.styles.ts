import styled from "styled-components";


const Container = styled.div<{ color: string }>`
    display: flex;
    flex-direction: column;
    background: ${props => props.color ?? '#111128'};
    border-radius: ${props => props.theme.sizes.medium2};
    width: calc(100vw - 144px);
    max-height: 200px;

    @media (${(props: any): string => props.theme.media.md}) {
        width: calc(100vw - 96px);
    }
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

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    color: ${props => props.theme.colors.text};
    cursor: default;
`;

const Icon = styled.div`
    margin-right: ${props => props.theme.sizes.small3};
`;

const DeleteButton = styled.div`
    font-family: 'Circular Bold';
    font-weight: bold;
    font-size: ${props => props.theme.sizes.medium3};
    line-height: ${props => props.theme.sizes.medium3};
    color: ${props => props.theme.colors.text};
    cursor: pointer;
`;


export {
    Container,
    Content,
    Header,
    Title,
    Icon,
    DeleteButton
}