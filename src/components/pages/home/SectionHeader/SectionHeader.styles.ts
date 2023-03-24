import styled from "styled-components";

const Header = styled.header`
    @media (${(props: any): string => props.theme.media.sm}) {
        padding-bottom: ${props => props.theme.sizes.large3};
    }
`;
const Container = styled.div``;

export { Header, Container }