import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 216px);
`;

const Title = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: "WorkSans Bold";
    line-height: 80px;
    font-size: ${(props: any): string => props.theme.sizes.large2};
    color: ${(props) => props.theme.colors.text};
`;

const Description = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: "WorkSans Lidht";
    font-size: ${(props: any): string => props.theme.sizes.medium2};
    color: ${(props) => props.theme.colors.text};
`;

export {
    Container,
    Title,
    Description
}