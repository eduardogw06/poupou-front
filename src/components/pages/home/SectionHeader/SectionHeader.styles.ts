import styled from "styled-components";

const Header = styled.header`
    @media (${(props: any): string => props.theme.media.sm}) {
        padding-bottom: 40px;
    }
`;
const Container = styled.div``;

export { Header, Container }